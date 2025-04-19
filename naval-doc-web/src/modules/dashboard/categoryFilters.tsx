// import React, { useState } from 'react';
// import { Button, Space } from 'antd';
// import { CategoryFiltersProps } from './types';
// import { headerStyles } from './styles';

// const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories }) => {
//   const [activeCategory, setActiveCategory] = useState<string>('All');

//   return (
//     <div style={headerStyles.categoryFilters}>
//       <Space size={[8, 16]} wrap>
//         {categories.map((category) => (
//           <Button
//             key={category}
//             type={activeCategory === category ? "primary" : "default"}
//             onClick={() => setActiveCategory(category)}
//             style={
//               activeCategory === category
//                 ? headerStyles.categoryActiveButton
//                 : headerStyles.categoryButton
//             }
//           >
//             {category}
//           </Button>
//         ))}
//       </Space>
//     </div>
//   );
// };

// export default CategoryFilters;

import React from 'react';
import { Button, Space } from 'antd';
import { CategoryFiltersProps } from '../../modules/dashboard/types';
import { headerStyles } from '../../modules/dashboard/styles';

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ 
  categories, 
  activeCategory,
  onCategoryChange 
}) => {
  return (
    <div style={headerStyles.categoryFilters}>
      <Space size={[8, 16]} wrap>
        {categories.map((category) => (
          <Button
            key={category}
            type={activeCategory === category ? "primary" : "default"}
            onClick={() => onCategoryChange(category)}
            style={
              activeCategory === category
                ? headerStyles.categoryActiveButton
                : headerStyles.categoryButton
            }
          >
            {category}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default CategoryFilters;