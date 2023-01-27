// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
  } from '@iconscout/react-unicons'
  
  // Analytics Cards imports
  import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
  
  // Recent Card Imports
  import img1 from "../imgs/img1.png";
  import img2 from "../imgs/img2.png";
  import img3 from "../imgs/img3.webp";
  
  // Sidebar Data
  export const SidebarData = [
    {
      key: 1,
      icon: UilEstate,
      heading: "Dashboard",
    },
    {
      key: 2,
      icon: UilClipboardAlt,
      heading: "Taxes",
    },
    {
      key: 3,
      icon: UilUsersAlt,
      heading: "Employees",
    },
    {
      key: 4,
      icon: UilPackage,
      heading: 'Complaints',
    },
    {
      key: 5,
      icon: UilChart,
      heading: 'Analytics',
    },
  ];
  
  // Analytics Cards Data
  export const cardsData = [
    {
      title: "Tax Payments",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: 70,
      value: "15,000",
      png: UilUsdSquare,
      series: [
        {
          name: "Tax Payments",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Complaints",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 80,
      value: "5",
      png: UilClipboardAlt,
      series: [
        {
          name: "Complaints",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Donations",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: 60,
      value: "4,270",
      png: UilMoneyWithdrawal,

      series: [
        {
          name: "Donations",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
  ];
  
  // Recent Update Card Data
  export const UpdatesData = [
    {
      key: 1,
      img: img1,
      name: "Shini Extra",
      noti: "New Offers from January till February",
      time: "25 seconds ago",
    },
    {
      key: 2,
      img: img2,
      name: "Ramallah Festival",
      noti: "Celebrate new years with us near Al-Manara",
      time: "30 minutes ago",
    },
    {
      key: 3,
      img: img3,
      name: "Flavoral",
      noti: "Opening Soon in March 2023",
      time: "2 hours ago",
    },
  ];
  