import images from "./images"

const data = {
    user: {
        name: '',
        img: images.avt
    },
    overall: [
        {
            value: '150',
            title: 'Complaints'
        },
        {
            value: '$15678',
            title: 'Paid Taxes'
        },
        {
            value: '9150',
            title: 'Users'
        },
        {
            value: '$1500',
            title: 'Donations'
        }
    ],
    updateAd: [
        {
            img: images.img1,
            name: "Shini Extra",
            noti: "New Offers from January till February",
        },
        {
            img: images.img2,
            name: "Ramallah Festival",
            noti: "Celebrate new years with us near Al-Manara",
        },
        {
            img: images.img3,
            name: "Flavoral",
            noti: "Opening Soon in March 2023",
        },
    ],
}


export default data