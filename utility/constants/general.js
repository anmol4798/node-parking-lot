const keys = {
    service: {
        type: "DROPDOWN", // Add a call to category service for allowedValues and stuff
        allowedValues: {
            PHOTOGRAPHY: "Photography"
        },
        name: "Choose your service",
        placeholder: "Service name goes here ...",
        currentValue: null
    },
    city: {
        type: "DROPDOWN",
        allowedValues: {
            BLR: "Bangalore",
            DLI: "Delhi"
        },
        name: "Choose your city",
        placeholder: "City goes here ...",
        currentValue: null
    },
    companyName: {
        type: "TEXT",
        name: "Company name",
        placeholder: "Enter your company name",
        currentValue: null
    },
    gstNumber: {
        type: "TEXT",
        name: "GST number",
        placeholder: "Enter your GST number",
        currentValue: null
    },
    companyRegistrationNumber: {
        type: "TEXT",
        name: "Company reg number",
        placeholder: "Enter your company reg number",
        currentValue: null
    },
    adhaarCard: {
        type: "LIST_OF_IMAGES",
        capacity: 2,
        columnHeaders: ["Front", "Back"],
        name: "Upload your Adhaar card",
        placeholder: "Choose file to upload",
        currentValue: null
    },
    portfolioImages: {
        type: "LIST_OF_IMAGES",
        capacity: 5,
        columnHeaders: [null, null, null, null, null],
        name: "Upload your portfolio",
        placeholder: "image url",
        currentValue: null
   }
};

const kycPages = [
    {
        SERVICE: keys.service,
        CITY: keys.city,
        COMPANY: keys.companyName,
        GST: keys.gstNumber,
        COMPANY_REGISTERATION_NUMBER: keys.companyRegistrationNumber,
        ADHAAR: keys.adhaarCard
    },
    {
        PORTFOLIO_IMAGES: keys.portfolioImages
    }
];

module.exports = {
    vendorHeaderKey: 'X-WEDLEY-VENDOR-ID',
    kycPages,
    pageCount: kycPages.length - 1
}