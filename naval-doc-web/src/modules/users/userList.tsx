import { useState } from "react";
import { Modal, Card, Row, Col } from "antd";
import UserImage from "./../../assets/images/navy_image.png";

interface User {
  id: number;
  name: string;
  mobile: string;
  phone: string;
  canteenName: string;
  canteenCode: string;
  aadharCard: string;
  addedBy: string;
  photo: string;
}

// Create 10 dummy users
const users: User[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  name: `User Name ${i + 1}`,
  mobile: `987654321${i}`,
  phone: `012345678${i}`,
  canteenName: `Canteen ${i + 1}`,
  canteenCode: `C00${i + 1}`,
  aadharCard: `XXXX-XXXX-XXXX`,
  addedBy: `Admin ${i + 1}`,
  photo: "https://via.placeholder.com/150", // Placeholder image
}));

function UsersList() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardClick = (user: User) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Split users manually
  const firstRow = users.slice(0, 4);
  const secondRow = users.slice(4, 8);
  const thirdRow = users.slice(8, 10);

  const renderRow = (rowUsers: User[]) => (
    <Row
      gutter={[16, 16]}
      justify="center"
      style={{ marginBottom: 20 }}
    >
      {rowUsers.map((user) => (
        <Col
          key={user.id}
          xs={24}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            hoverable
            onClick={() => handleCardClick(user)}
            style={{
              width: 250,
              textAlign: "center",
              cursor: "pointer",
            }}
            cover={
              <img
                alt="user-photo"
                src={UserImage}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                }}
              />
            }
          >
            <div style={{ fontWeight: "bold" }}>{user.name}</div>
            <div style={{ fontSize: 12 }}>{user.mobile}</div>
            <div
              style={{
                color: "#1890ff",
                marginTop: 5,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              View Details
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div style={{ padding: 20 }}>
      {renderRow(firstRow)}
      {renderRow(secondRow)}
      {renderRow(thirdRow)}

      <Modal
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={400}
      >
        {selectedUser && (
          <Card
            style={{ textAlign: "center", border: "none", boxShadow: "none" }}
            cover={
              <img
                alt="Selected User"
                src={UserImage}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            }
          >
            <div style={{ marginTop: 10, textAlign: "left" }}>
              <p><strong>User Name:</strong> {selectedUser.name}</p>
              <p><strong>Mobile Number:</strong> {selectedUser.mobile}</p>
              <p><strong>Phone Number:</strong> {selectedUser.phone}</p>
              <p><strong>Canteen Name:</strong> {selectedUser.canteenName}</p>
              <p><strong>Canteen Code:</strong> {selectedUser.canteenCode}</p>
              <p><strong>Aadhaar Card:</strong> {selectedUser.aadharCard}</p>
              <p><strong>Added By:</strong> {selectedUser.addedBy}</p>
            </div>
          </Card>
        )}
      </Modal>
    </div>
  );
}

export default UsersList;
