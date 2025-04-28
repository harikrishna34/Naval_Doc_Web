import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  InputNumber,
  message,
  Button,
  Spin,
  Card,
  Row,
  Col,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { Item, MenuConfiguration, CreateMenuPayload } from "./types";
import {
  itemService,
  menuConfigService,
  menuService,
  canteenService,
} from "../../auth/apiService";

interface AddMenuModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const { Text } = Typography;

const AddMenuModal: React.FC<AddMenuModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState<Item[]>([]);
  const [menuConfigurations, setMenuConfigurations] = useState<
    MenuConfiguration[]
  >([]);
  const [canteens, setCanteens] = useState<any[]>([]); // Added canteens state
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [loadingConfigs, setLoadingConfigs] = useState<boolean>(false);
  const [loadingCanteens, setLoadingCanteens] = useState<boolean>(false); // Added loading state for canteens
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      fetchItems();
      fetchMenuConfigurations();
      fetchCanteens(); // Added fetch canteens call
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

  // Added function to fetch canteens
  const fetchCanteens = async () => {
    try {
      setLoadingCanteens(true);
      const response = await canteenService.getAllCanteens();
      console.log(response, "canteens-res");

      if (response && response.data) {
        setCanteens(response.data);
        // Set default canteen if available
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

      // Format the items with min and max quantities
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
        startDate: startDate || "",
        endDate: endDate || "",
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
      bodyStyle={{ padding: "24px", maxHeight: "80vh", overflow: "auto" }}
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
        {/* Description and Canteen Selection in same row */}
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

        {/* Date fields and Meal Type in one row */}
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
            // <div style={{ maxHeight: "400px", overflow: "auto", marginTop: "16px" }}>
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
                      bodyStyle={{ padding: "16px" }}
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
