import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Upload,
  message,
  InputNumber,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import WorldtekLogo from "../../components/common/worldTekLogo";
import { itemService } from "../../auth/apiService";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;
const { Text, Title } = Typography;
const { TextArea } = Input;

interface AddItemModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  onSuccess: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  isOpen,
  onCancel,
  onSubmit,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleOk = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      // Create a FormData object for the API request
      const formData = new FormData();
      formData.append("name", values.name.trim());
      formData.append("description", values.description.trim());
      formData.append("type", values.type);
      formData.append("quantity", values.quantity.toString());
      formData.append("quantityUnit", values.quantityUnit);
      formData.append("price", values.price.toString());

      // Format dates for API
      if (values.startDate) {
        formData.append("startDate", values.startDate.format("DD-MM-YYYY"));
      }
      if (values.endDate) {
        formData.append("endDate", values.endDate.format("DD-MM-YYYY"));
      }

      // Add item image if provided
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      // Call the API to create a new item
      await itemService.createItem(formData);

      message.success("Item added successfully!");
      form.resetFields();
      setFileList([]);
      onSubmit(values);
      onSuccess(); // Refresh the item list
      onCancel(); // Close modal
    } catch (error) {
      console.error("Failed to add item:", error);
      message.error("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formItemStyle = {
    marginBottom: "16px",
  };

  const inputStyle = {
    width: "100%",
    height: "40px",
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  // Custom validation for file upload
  const validateFileUpload = () => {
    if (fileList.length === 0) {
      return Promise.reject("Please upload an item image");
    }

    const file = fileList[0]?.originFileObj;
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        return Promise.reject("You can only upload image files!");
      }
      if (!isLt2M) {
        return Promise.reject("Image must be smaller than 2MB!");
      }
    }

    return Promise.resolve();
  };

  // Disallow past dates for start date
  const disablePastDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  // Ensure end date is after start date
  const disableInvalidEndDate = (current: Dayjs) => {
    const startDate = form.getFieldValue("startDate");
    if (!startDate) {
      return false;
    }
    return current && current.isBefore(startDate);
  };

  return (
    <Modal
      className="add-item-modal"
      title="Add Menu Item"
      open={isOpen}
      onCancel={onCancel}
      width={920}
      centered
      footer={null}
      bodyStyle={{ maxHeight: "75vh", overflowY: "auto", padding: "24px" }}
    >
      <Form form={form} layout="vertical" name="add_item_form">
        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="name"
              label="Item Name"
              rules={[
                { required: true, message: "Please enter item name" },
                {
                  min: 3,
                  message: "Item name must be at least 3 characters",
                },
                {
                  max: 50,
                  message: "Item name cannot exceed 50 characters",
                },
                {
                  whitespace: true,
                  message: "Item name cannot be empty spaces",
                },
              ]}
              style={formItemStyle}
            >
              <Input placeholder="Enter Item name" style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="type"
              label="Item Type"
              rules={[{ required: true, message: "Please select item type" }]}
              style={formItemStyle}
            >
              <Select placeholder="Select Type" style={inputStyle}>
                <Option value="veg">Vegetarian</Option>
                <Option value="non-veg">Non-Vegetarian</Option>
                <Option value="beverage">Beverage</Option>
                <Option value="dessert">Dessert</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter item description" },
                {
                  min: 10,
                  message: "Description must be at least 10 characters",
                },
                {
                  max: 200,
                  message: "Description cannot exceed 200 characters",
                },
              ]}
              style={formItemStyle}
            >
              <TextArea
                placeholder="Enter item description"
                rows={3}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={8} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                { required: true, message: "Please enter quantity" },
                {
                  type: "number",
                  min: 1,
                  message: "Quantity must be at least 1",
                },
              ]}
              style={formItemStyle}
            >
              <InputNumber
                placeholder="Enter quantity"
                style={{ width: "100%", height: "40px" }}
                min={1}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="quantityUnit"
              label="Unit"
              rules={[{ required: true, message: "Please select unit" }]}
              style={formItemStyle}
            >
              <Select placeholder="Select Unit" style={inputStyle}>
                <Option value="grams">Grams</Option>
                <Option value="ml">Milliliters</Option>
                <Option value="pieces">Pieces</Option>
                <Option value="plates">Plates</Option>
                <Option value="servings">Servings</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="price"
              label="Price (₹)"
              rules={[
                { required: true, message: "Please enter price" },
                {
                  type: "number",
                  min: 0,
                  message: "Price cannot be negative",
                },
              ]}
              style={formItemStyle}
            >
              <InputNumber
                placeholder="Enter price"
                style={{ width: "100%", height: "40px" }}
                min={0}
                step={0.01}
                precision={2}
                formatter={(value) => `₹ ${value}`}
                // parser={(value) => Number(value?.replace(/₹\s?/g, "") || 0)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="startDate"
              label="Available From"
              rules={[{ required: true, message: "Please select start date" }]}
              style={formItemStyle}
            >
              <DatePicker
                placeholder="DD-MM-YYYY"
                style={inputStyle}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} style={{ marginBottom: "16px" }}>
            <Form.Item
              name="endDate"
              label="Available Until"
              rules={[{ required: true, message: "Please select end date" }]}
              style={formItemStyle}
              dependencies={["startDate"]}
            >
              <DatePicker
                placeholder="DD-MM-YYYY"
                style={inputStyle}
                format="DD-MM-YYYY"
                disabledDate={disableInvalidEndDate}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24}>
            <Form.Item
              name="itemImage"
              label="Item Image"
              rules={[
                { required: true, message: "Please upload item image" },
                { validator: validateFileUpload },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    message.error("You can only upload image files!");
                  }
                  const isLt2M = file.size / 1024 / 1024 < 2;
                  if (!isLt2M) {
                    message.error("Image must be smaller than 2MB!");
                  }
                  return false; // Prevent auto upload
                }}
              >
                <Button icon={<UploadOutlined />}>Upload Item Image</Button>
                <Text type="secondary" style={{ marginLeft: 8 }}>
                  Supported formats: JPG, PNG. Max size: 2MB
                </Text>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center" style={{ marginTop: "24px" }}>
          <Col xs={24} sm={12} md={8}>
            <Button
              type="primary"
              block
              onClick={handleOk}
              loading={loading}
              style={{ height: "40px" }}
            >
              Add Item
            </Button>
          </Col>
        </Row>

        <WorldtekLogo />
      </Form>
    </Modal>
  );
};

export default AddItemModal;
