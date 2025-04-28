import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  canteenService,
  itemService,
  menuConfigService,
  menuService,
} from "../../auth/apiService";
import { CreateMenuPayload, Item, MenuConfiguration } from "./types";

interface AddMenuModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  existingMenuTypes: any
}

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  visible,
  onCancel,
  onSuccess,
  existingMenuTypes
}) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<Item[]>([]);
  const [menuConfigurations, setMenuConfigurations] = useState<
    MenuConfiguration[]
  >([]);
  const [canteens, setCanteens] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [loadingConfigs, setLoadingConfigs] = useState<boolean>(false);
  const [loadingCanteens, setLoadingCanteens] = useState<boolean>(false); 
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      fetchItems();
      fetchMenuConfigurations();
      fetchCanteens();
    }
  }, [visible]);

  const fetchItems = async () => {
    try {
      setLoadingItems(true);
      const response = await itemService.getAllItems();
      if (response && response.data) {
        setItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      message.error("Failed to load items");
    } finally {
      setLoadingItems(false);
    }
  };

  const fetchMenuConfigurations = async () => {
    try {
      setLoadingConfigs(true);
      const response = await menuConfigService.getAllMenuConfigurations();
      if (response && response.data) {
        setMenuConfigurations(response.data);
      }
    } catch (error) {
      console.error("Error fetching menu configurations:", error);
      message.error("Failed to load menu types");
    } finally {
      setLoadingConfigs(false);
    }
  };

  const fetchCanteens = async () => {
    try {
      setLoadingCanteens(true);
      const response = await canteenService.getAllCanteens();
      if (response && response.data) {
        setCanteens(response.data);
        if (response.data.length > 0) {
          form.setFieldsValue({ canteenId: response.data[0].id });
        }
      }
    } catch (error) {
      console.error("Error fetching canteens:", error);
      message.error("Failed to load canteens");
    } finally {
      setLoadingCanteens(false);
    }
  };

  const handleItemSelect = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const selectedConfigId = values?.menuType;
      const selectedConfig = menuConfigurations.find(
        config => config.id === selectedConfigId
      );
      if (selectedConfig?.name && existingMenuTypes.includes(selectedConfig?.name)) {
        await Swal.fire({
          icon: "error",
          title: "Menu Type Exists",
          text: `A menu with the type "${selectedConfig.name}" already exists. Please choose a different menu type.`,
          confirmButtonColor: '#d33'
        });
        return;
      }

      const menuItems = selectedItems.map((itemId) => {
        return {
          itemId,
          minQuantity: values[`min_${itemId}`] || 1,
          maxQuantity: values[`max_${itemId}`] || 10,
        };
      });

      if (menuItems.length === 0) {
        message.error("Please select at least one item");
        return;
      }

      const startDate = values.startDate
        ? dayjs(values.startDate).format("DD-MM-YYYY")
        : undefined;
      const endDate = values.endDate
        ? dayjs(values.endDate).format("DD-MM-YYYY")
        : undefined;

      const menuData: CreateMenuPayload = {
        menuConfigurationId: values.menuType,
        canteenId: values.canteenId,
        description: values.description,
        items: menuItems,
        startTime: startDate || "",
        endTime: endDate || "",
      };

      setSubmitting(true);
      await menuService.createMenuWithItems(menuData);
      onSuccess();
      resetForm();
    } catch (error) {
      console.error("Error creating menu:", error);
      message.error("Failed to create menu");
    } finally {
      setSubmitting(false);
    }
  };
  const resetForm = () => {
    form.resetFields();
    setSelectedItems([]);
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <Modal
      title="Add Menu"
      open={visible}
      width={1000}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleSubmit}
        >
          Submit
        </Button>,
      ]}
      styles={{body:{maxHeight: "80vh", overflow: "auto", padding: "24px"}}}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          description: "",
          startDate: dayjs(),
          endDate: dayjs().add(1, "day"),
        }}
      >
        <Row gutter={16}>
          <Col span={16}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description" },
              ]}
            >
              <TextArea rows={2} placeholder="Menu description" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="canteenId"
              label="Canteen"
              rules={[{ required: true, message: "Please select a canteen" }]}
            >
              {loadingCanteens ? (
                <Spin size="small" />
              ) : (
                <Select placeholder="Select canteen">
                  {canteens.map((canteen) => (
                    <Option key={canteen.id} value={canteen.id}>
                      {canteen.canteenName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[{ required: true, message: "Please select start date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="endDate"
              label="End Date"
              rules={[{ required: true, message: "Please select end date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="menuType"
              label="Meal Type"
              rules={[{ required: true, message: "Please select a meal type" }]}
            >
              {loadingConfigs ? (
                <Spin size="small" />
              ) : (
                <Select placeholder="Select meal type">
                  {menuConfigurations.map((config) => (
                    <Option key={config.id} value={config.id}>
                      {config.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <div style={{ margin: "16px 0 8px 0" }}>
          <Text strong style={{ fontSize: "16px" }}>
            Select Items
          </Text>
          {loadingItems ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "16px 0",
              }}
            >
              <Spin />
            </div>
          ) : (
            <div style={{ maxHeight: "400px", marginTop: "16px" }}>
              <Row gutter={[16, 16]}>
                {items.map((item) => (
                  <Col span={12} key={item.id}>
                    <Card
                      size="small"
                      style={{
                        borderColor: selectedItems.includes(item.id)
                          ? "#1890ff"
                          : "#f0f0f0",
                        backgroundColor: selectedItems.includes(item.id)
                          ? "#e6f7ff"
                          : "#fff",
                      }}
                      styles={{body: {padding:"16px"}}}
                    >
                      <div
                        style={{ display: "flex", alignItems: "flex-start" }}
                      >
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) =>
                            handleItemSelect(item.id, e.target.checked)
                          }
                          style={{ marginTop: "4px" }}
                        />
                        <div style={{ marginLeft: "8px", flex: 1 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Text strong>{item.name}</Text>
                            <Text type="secondary">₹{item.price}</Text>
                          </div>
                          <Text
                            type="secondary"
                            style={{ fontSize: "12px", marginTop: "4px" }}
                          >
                            {item.description}
                          </Text>

                          {selectedItems.includes(item.id) && (
                            <Row gutter={8} style={{ marginTop: "12px" }}>
                              <Col span={12}>
                                <Form.Item
                                  name={`min_${item.id}`}
                                  label="Min Quantity"
                                  initialValue={1}
                                  style={{ marginBottom: 0 }}
                                >
                                  <InputNumber
                                    min={1}
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  name={`max_${item.id}`}
                                  label="Max Quantity"
                                  initialValue={10}
                                  style={{ marginBottom: 0 }}
                                >
                                  <InputNumber
                                    min={1}
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default AddMenuModal;
