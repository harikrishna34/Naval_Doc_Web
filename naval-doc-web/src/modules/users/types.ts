import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  photoUrl: string;
  canteenName?: string;
  canteenCode?: string;
  aadhaarCard?: string;
  addedBy?: string;
}

export type UserFormData = Omit<User, "id">;


export const dummyUsers: User[] = [
  {
    id: uuidv4(),
    name: 'John Doe',
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=1',
    canteenName: 'Main Canteen',
    canteenCode: 'MC001',
    aadhaarCard: '1234-5678-9012',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Jane Smith',
    mobile: '987-654-3210',
    email: 'jane.smith@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=2',
    canteenName: 'Tech Canteen',
    canteenCode: 'TC002',
    aadhaarCard: '2345-6789-0123',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Michael Johnson',
    mobile: '456-789-0123',
    email: 'michael.johnson@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=3',
    canteenName: 'North Canteen',
    canteenCode: 'NC003',
    aadhaarCard: '3456-7890-1234',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Emily Davis',
    mobile: '789-012-3456',
    email: 'emily.davis@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=4',
    canteenName: 'South Canteen',
    canteenCode: 'SC004',
    aadhaarCard: '4567-8901-2345',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Robert Wilson',
    mobile: '234-567-8901',
    email: 'robert.wilson@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=5',
    canteenName: 'East Canteen',
    canteenCode: 'EC005',
    aadhaarCard: '5678-9012-3456',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Sarah Brown',
    mobile: '567-890-1234',
    email: 'sarah.brown@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=6',
    canteenName: 'West Canteen',
    canteenCode: 'WC006',
    aadhaarCard: '6789-0123-4567',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'David Miller',
    mobile: '890-123-4567',
    email: 'david.miller@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=7',
    canteenName: 'Central Canteen',
    canteenCode: 'CC007',
    aadhaarCard: '7890-1234-5678',
    addedBy: 'Krishna'
  },
  {
    id: uuidv4(),
    name: 'Lisa Taylor',
    mobile: '901-234-5678',
    email: 'lisa.taylor@example.com',
    photoUrl: 'https://i.pravatar.cc/300?img=8',
    canteenName: 'VIP Canteen',
    canteenCode: 'VC008',
    aadhaarCard: '8901-2345-6789',
    addedBy: 'Krishna'
  }
];