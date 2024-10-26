import {
  blogimg2,
  blogimg6,
  blogimg4,
  blogimg12,
  blogimg10,
  blogimg8,
} from "../imagepath";

export const employeedata = [
  {
    id: "EID-001",
    Img: blogimg2,
    EmployeeName: "Andrea Lalema",
    Email: "example@gmail.com",
    JoiningDate: "01.05.2020",
    Role: "Nurse",
    Salary: "$1000",
    status: "Generate Slip",
  },
  {
    id: "EID-002",
    Img: blogimg6,
    EmployeeName: "William Stephin",
    Email: "example@email.com",
    JoiningDate: "03.05.2020",
    Role: "Accountant",
    Salary: "$2000",
    status: "Generate Slip",
  },
  {
    id: "EID-003",
    Img: blogimg4,
    EmployeeName: "Smith Bruklin",
    Email: "example@email.com",
    JoiningDate: "04.05.2020",
    Role: "Pharmacist",
    Salary: "$1500",
    status: "Generate Slip",
  },
  {
    id: "EID-004",
    Img: blogimg12,
    EmployeeName: "Bernardo James",
    Email: "example@email.com",
    JoiningDate: "06.06.2020",
    Role: "Pharmacist",
    Salary: "$1000",
    status: "Generate Slip",
  },
  {
    id: "EID-005",
    Img: blogimg10,
    EmployeeName: "Cristina Groves",
    Email: "example@email.com",
    JoiningDate: "13.05.2020",
    Role: "Accountant",
    Salary: "$5000",
    status: "Generate Slip",
  },
  {
    id: "EID-006",
    Img: blogimg8,
    EmployeeName: "Mark Hay Smith",
    Email: "example@email.com",
    JoiningDate: "11.12.2020",
    Role: "Pharmacist",
    Salary: "$2000",
    status: "Generate Slip",
  },
  {
    id: "EID-007",
    Img: blogimg2,
    EmployeeName: "Andrea Lalema",
    Email: "example@email.com",
    JoiningDate: "01.05.2020",
    Role: "Accountant",
    Salary: "$1000",
    status: "Generate Slip",
  },
  {
    id: "EID-008",
    Img: blogimg4,
    EmployeeName: "Smith Bruklin",
    Email: "example@email.com",
    JoiningDate: "01.05.2020",
    Role: "Nurse",
    Salary: "$2000",
    status: "Generate Slip",
  },
];

export const ExpenseReportData = [
  {
    id: 1,
    Item: "Anaesthetic machine",
    Purchase_Form: "Biomedical Equipment Inc",
    Img: blogimg2,
    Purchase_by: "Andrea Lalema",
    Paid_by: "Paypal",
    Data: "04.10.2022",
    Amount: "$1000",
    status: "Approved",
  },
  {
    id: 2,
    Item: "Aspiration Pump",
    Purchase_Form: "Medi Pro Service",
    Img: blogimg6,
    Purchase_by: "William Stephin",
    Paid_by: "Cheque",
    Data: "08.10.2022",
    Amount: "$2000",
    status: "Declined",
  },
  {
    id: 3,
    Item: "Anaesthetic machine",
    Purchase_Form: "Biomedical Equipment Inc",
    Img: blogimg4,
    Purchase_by: "Smith Bruklin",
    Paid_by: "Paypal",
    Data: "04.10.2022",
    Amount: "$1500",
    status: "New",
  },
  {
    id: 4,
    Item: "Anaesthetic machine",
    Purchase_Form: "Biomedical Equipment Inc",
    Img: blogimg12,
    Purchase_by: "Bernardo James",
    Paid_by: "Paypal",
    Data: "04.10.2022",
    Amount: "$1000",
    status: "Rejected",
  },
  {
    id: 5,
    Item: "Medical Expenses",
    Purchase_Form: "Hi-life Medicals",
    Img: blogimg10,
    Purchase_by: "Cristina Groves",
    Paid_by: "Debit Card",
    Data: "03.10.2022",
    Amount: "$5000",
    status: "Approved",
  },
  {
    id: 6,
    Item: "Anaesthetic machine",
    Purchase_Form: "Biomedical Equipment Inc",
    Img: blogimg8,
    Purchase_by: "Mark Hay Smith",
    Paid_by: "Paypal",
    Data: "04.10.2022",
    Amount: "$2000",
    status: "Approved",
  },
  {
    id: 7,
    Item: "Aspiration Pump",
    Purchase_Form: "Medi Pro Service",
    Img: blogimg2,
    Purchase_by: "Andrea Lalema",
    Paid_by: "Cheque",
    Data: "06.10.2022",
    Amount: "$1000",
    status: "New",
  },
  {
    id: 8,
    Item: "Medical Expenses",
    Purchase_Form: "Hi-life Medicals",
    Img: blogimg4,
    Purchase_by: "Smith Bruklin",
    Paid_by: "Debit Card",
    Data: "04.10.2022",
    Amount: "$2000",
    status: "Approved",
  },
];

export const invoicereportdata = [
  {
    id: 1,
    Invoice_Number: "#INV-0001",
    Img: blogimg2,
    Client: "Andrea Lalema",
    Created_Date: "04.10.2022",
    Due_Date: "04.10.2023",
    Amount: "$1000",
    Status: "Paid",
  },
];
export const invoice_list_data = [
  {
    id: 1,
    Invoice_Id: "IN093439#@09",
    Category: "Advertising",
    Created_on: "16 Mar 2022",
    Img: blogimg2,
    Invoice_to: "Barbara Moore",
    Amount: "$1000",
    Due_data: "23 Mar 2022",
    Last_Invoice: "23 Mar 2022",
    Next_Invoice: "28 Mar 2022",
    Frequency: "03 months",
    status: "Paid",
    status1: "Paid",
    status2: "Overdue 7 days",
    status3: "Active",
  },
  {
    id: 2,
    Invoice_Id: "IN093439#@10",
    Category: "Food",
    Created_on: "14 Mar 2022",
    Img: blogimg6,
    Invoice_to: "Karlene Chaidez",
    Amount: "$2000",
    Due_data: "08 Mar 2022",
    Last_Invoice: "18 Mar 2022",
    Next_Invoice: "20 Mar 2022",
    Frequency: "08 months",
    status: "Overdue",
    status1: "Paid",
    status2: "Overdue 4 days",
    status3: "Active",
  },
  {
    id: 3,
    Invoice_Id: "IN093439#@11",
    Category: "Marketing",
    Created_on: "7 Mar 2022",
    Img: blogimg4,
    Invoice_to: "Russell Copeland",
    Amount: "$1500",
    Due_data: "04 Mar 2022",
    Last_Invoice: "10 Mar 2022",
    Next_Invoice: "18 Mar 2022",
    Frequency: "10 months",
    status: "Cancelled",
    status1: "Paid",
    status2: "Overdue 3 days",
    status3: "Expired",
  },
  {
    id: 4,
    Invoice_Id: "IN093439#@12",
    Category: "Repairs",
    Created_on: "24 Mar 2022",
    Img: blogimg12,
    Invoice_to: "Joseph Collins",
    Amount: "$1000",
    Due_data: "04 Mar 2022",
    Last_Invoice: "15 Mar 2022",
    Next_Invoice: "22 Mar 2022",
    Frequency: "12 months",
    status: "Paid",
    status1: "Paid",
    status2: "Overdue 6 days",
    status3: "Expired",
  },
  {
    id: 5,
    Invoice_Id: "IN093439#@12",
    Category: "Sosftware",
    Created_on: "17 Mar 2022",
    Img: blogimg10,
    Invoice_to: "Jennifer Floyd",
    Amount: "$5000",
    Due_data: "03 Mar 2022",
    Last_Invoice: "20 Mar 2022",
    Next_Invoice: "31 Mar 2022",
    Frequency: "14 months",
    status: "Overdue",
    status1: "Paid",
    status2: "Overdue 3 days",
    status3: "Active",
  },
];

export const tabledata = [
  {
    id: 1,
    Name: "Tiger Nixon",
    Position: "System Architect",
    Office: "Edinburgh",
    Age: 61,
    Startdate: "2011/04/25",
    Salary: "$320,800",
  },
  {
    id: 2,
    Name: "Garrett Winters",
    Position: "Accountant",
    Office: "Tokyo",
    Age: 63,
    Startdate: "2011/07/25",
    Salary: "$170,750",
  },
  {
    id: 3,
    Name: "Ashton Cox",
    Position: "Junior Technical Author",
    Office: "San Francisco",
    Age: 66,
    Startdate: "2009/01/12",
    Salary: "$86,000",
  },
  {
    id: 4,
    Name: "Cedric Kelly",
    Position: "Senior Javascript Developer",
    Office: "Edinburgh",
    Age: 22,
    Startdate: "2012/03/29",
    Salary: "$433,060",
  },
  {
    id: 5,
    Name: "Airi Satou",
    Position: "Accountant",
    Office: "Tokyo",
    Age: 33,
    Startdate: "2008/11/28",
    Salary: "$162,700",
  },
  {
    id: 6,
    Name: "Brielle Williamson",
    Position: "Integration Specialist",
    Office: "New York",
    Age: 61,
    Startdate: "2012/12/02",
    Salary: "$372,000",
  },
  {
    id: 7,
    Name: "Herrod Chandler",
    Position: "Sales Assistant",
    Office: "San Francisco",
    Age: 59,
    Startdate: "2012/08/06",
    Salary: "$137,500",
  },
  {
    id: 8,
    Name: "Rhona Davidson",
    Position: "Integration Specialist",
    Office: "Tokyo",
    Age: 55,
    Startdate: "2010/10/14",
    Salary: "$327,900",
  },
  {
    id: 9,
    Name: "Colleen Hurst",
    Position: "Javascript Developer",
    Office: "San Francisco",
    Age: 39,
    Startdate: "2009/09/15",
    Salary: "$205,500",
  },
  {
    id: 10,
    Name: "Sonya Frost",
    Position: "Software Engineer",
    Office: "Edinburgh",
    Age: 23,
    Startdate: "2008/12/13",
    Salary: "$103,600",
  },
  {
    id: 11,
    Name: "Jena Gaines",
    Position: "Office Manager",
    Office: "London",
    Age: 30,
    Startdate: "2008/12/19",
    Salary: "$90,560",
  },
  {
    id: 12,
    Name: "Quinn Flynn",
    Position: "Support Lead",
    Office: "Edinburgh",
    Age: 22,
    Startdate: "2013/03/03",
    Salary: "$342,000",
  },
  {
    id: 13,
    Name: "Charde Marshall",
    Position: "Regional Director",
    Office: "San Francisco",
    Age: 36,
    Startdate: "2008/10/16",
    Salary: "$470,600",
  },
  {
    id: 14,
    Name: "Haley Kennedy",
    Position: "Senior Marketing Designer",
    Office: "London",
    Age: 43,
    Startdate: "2012/12/18",
    Salary: "$313,500",
  },
  {
    id: 15,
    Name: "Tatyana Fitzpatrick",
    Position: "Regional Director",
    Office: "London",
    Age: 19,
    Startdate: "2010/03/17",
    Salary: "$385,750",
  },
  {
    id: 16,
    Name: "Michael Silva",
    Position: "Marketing Designer",
    Office: "London",
    Age: 66,
    Startdate: "2012/11/27",
    Salary: "$198,500",
  },
  {
    id: 17,
    Name: "Paul Byrd",
    Position: "Chief Financial Officer (CFO)",
    Office: "New York",
    Age: 64,
    Startdate: "2010/06/09",
    Salary: "$725,000",
  },
  {
    id: 18,
    Name: "Gloria Little",
    Position: "Systems Administrator",
    Office: "New York",
    Age: 59,
    Startdate: "2009/04/10",
    Salary: "$237,500",
  },
  {
    id: 19,
    Name: "Bradley Greer",
    Position: "Software Engineer",
    Office: "London",
    Age: 41,
    Startdate: "2012/10/13",
    Salary: "$132,000",
  },
  {
    id: 20,
    Name: "Dai Rios",
    Position: "Personnel Lead",
    Office: "Edinburgh",
    Age: 35,
    Startdate: "2012/09/26",
    Salary: "$217,500",
  },
  {
    id: 21,
    Name: "Jenette Caldwell",
    Position: "Development Lead",
    Office: "New York",
    Age: 30,
    Startdate: "2011/09/03",
    Salary: "$345,000",
  },
  {
    id: 22,
    Name: "Yuri Berry",
    Position: "Chief Marketing Officer (CMO)",
    Office: "New York",
    Age: 40,
    Startdate: "2009/06/25",
    Salary: "$675,000",
  },
  {
    id: 23,
    Name: "Caesar Vance",
    Position: "Pre-Sales Support",
    Office: "New York",
    Age: 21,
    Startdate: "2011/12/12",
    Salary: "$106,450",
  },
  {
    id: 24,
    Name: "Doris Wilder",
    Position: "Sales Assistant",
    Office: "Sidney",
    Age: 23,
    Startdate: "2010/09/20",
    Salary: "$85,600",
  },
  {
    id: 25,
    Name: "Angelica Ramos",
    Position: "Chief Executive Officer (CEO)",
    Office: "London",
    Age: 47,
    Startdate: "2009/10/09",
    Salary: "$1,200,000",
  },
  {
    id: 26,
    Name: "Gavin Joyce",
    Position: "Developer",
    Office: "Edinburgh",
    Age: 42,
    Startdate: "2010/12/22",
    Salary: "$92,575",
  },
  {
    id: 27,
    Name: "Jennifer Chang",
    Position: "Regional Director",
    Office: "Singapore",
    Age: 28,
    Startdate: "2010/11/14",
    Salary: "$357,650",
  },
  {
    id: 28,
    Name: "Brenden Wagner",
    Position: "Software Engineer",
    Office: "San Francisco",
    Age: 28,
    Startdate: "2011/06/07",
    Salary: "$206,850",
  },
  {
    id: 29,
    Name: "Fiona Green",
    Position: "Chief Operating Officer (COO)",
    Office: "San Francisco",
    Age: 48,
    Startdate: "2010/03/11",
    Salary: "$850,000",
  },
  {
    id: 30,
    Name: "Shou Itou",
    Position: "Regional Marketing",
    Office: "Tokyo",
    Age: 20,
    Startdate: "2011/08/14",
    Salary: "$163,000",
  },
  {
    id: 31,
    Name: "Michelle House",
    Position: "Integration Specialist",
    Office: "Sidney",
    Age: 37,
    Startdate: "2011/06/02",
    Salary: "$95,400",
  },
  {
    id: 32,
    Name: "Suki Burks",
    Position: "Developer",
    Office: "London",
    Age: 53,
    Startdate: "2009/10/22",
    Salary: "$114,500",
  },
  {
    id: 33,
    Name: "Prescott Bartlett",
    Position: "Technical Author",
    Office: "London",
    Age: 27,
    Startdate: "2011/05/07",
    Salary: "$145,000",
  },
  {
    id: 34,
    Name: "Gavin Cortez",
    Position: "Team Leader",
    Office: "San Francisco",
    Age: 22,
    Startdate: "2008/10/26",
    Salary: "$235,500",
  },
  {
    id: 35,
    Name: "Martena Mccray",
    Position: "Post-Sales support",
    Office: "Edinburgh",
    Age: 46,
    Startdate: "2011/03/09",
    Salary: "$324,050",
  },
  {
    id: 36,
    Name: "Unity Butler",
    Position: "Marketing Designer",
    Office: "San Francisco",
    Age: 47,
    Startdate: "2009/12/09",
    Salary: "$85,675",
  },
  {
    id: 37,
    Name: "Howard Hatfield",
    Position: "Office Manager",
    Office: "San Francisco",
    Age: 51,
    Startdate: "2008/12/16",
    Salary: "$164,500",
  },
  {
    id: 38,
    Name: "Hope Fuentes",
    Position: "Secretary",
    Office: "San Francisco",
    Age: 41,
    Startdate: "2010/02/12",
    Salary: "$109,850",
  },
  {
    id: 39,
    Name: "Vivian Harrell",
    Position: "Financial Controller",
    Office: "San Francisco",
    Age: 62,
    Startdate: "2009/02/14",
    Salary: "$452,500",
  },
  {
    id: 40,
    Name: "Timothy Mooney",
    Position: "Office Manager",
    Office: "London",
    Age: 37,
    Startdate: "2008/12/11",
    Salary: "$136,200",
  },
  {
    id: 41,
    Name: "Jackson Bradshaw",
    Position: "Director",
    Office: "New York",
    Age: 65,
    Startdate: "2008/09/26",
    Salary: "$645,750",
  },
  {
    id: 42,
    Name: "Olivia Liang",
    Position: "Support Engineer",
    Office: "Singapore",
    Age: 64,
    Startdate: "2011/02/03",
    Salary: "$234,500",
  },
  {
    id: 43,
    Name: "Bruno Nash",
    Position: "Software Engineer",
    Office: "London",
    Age: 38,
    Startdate: "2011/05/03",
    Salary: "$163,500",
  },
  {
    id: 44,
    Name: "Sakura Yamamoto",
    Position: "Support Engineer",
    Office: "Tokyo",
    Age: 37,
    Startdate: "2009/08/19",
    Salary: "$139,575",
  },
  {
    id: 45,
    Name: "Thor Walton",
    Position: "Developer",
    Office: "New York",
    Age: 61,
    Startdate: "2013/08/11",
    Salary: "$98,540",
  },
  {
    id: 46,
    Name: "Finn Camacho",
    Position: "Support Engineer",
    Office: "San Francisco",
    Age: 47,
    Startdate: "2009/07/07",
    Salary: "$87,500",
  },
  {
    id: 47,
    Name: "Serge Baldwin",
    Position: "Data Coordinator",
    Office: "Singapore",
    Age: 64,
    Startdate: "2012/04/09",
    Salary: "$138,575",
  },
  {
    id: 48,
    Name: "Zenaida Frank",
    Position: "Software Engineer",
    Office: "New York",
    Age: 63,
    Startdate: "2010/01/04",
    Salary: "$125,250",
  },
  {
    id: 49,
    Name: "Zorita Serrano",
    Position: "Software Engineer",
    Office: "San Francisco",
    Age: 56,
    Startdate: "2012/06/01",
    Salary: "$115,000",
  },
  {
    id: 50,
    Name: "Jennifer Acosta",
    Position: "Junior Javascript Developer",
    Office: "Edinburgh",
    Age: 43,
    Startdate: "2013/02/01",
    Salary: "$75,650",
  },
  {
    id: 51,
    Name: "Cara Stevens",
    Position: "Sales Assistant",
    Office: "New York",
    Age: 46,
    Startdate: "2011/12/06",
    Salary: "$145,600",
  },
  {
    id: 52,
    Name: "Hermione Butler",
    Position: "Regional Director",
    Office: "London",
    Age: 47,
    Startdate: "2011/03/21",
    Salary: "$356,250",
  },
  {
    id: 53,
    Name: "Lael Greer",
    Position: "Systems Administrator",
    Office: "London",
    Age: 21,
    Startdate: "2009/02/27",
    Salary: "$103,500",
  },
  {
    id: 54,
    Name: "Jonas Alexander",
    Position: "Developer",
    Office: "San Francisco",
    Age: 30,
    Startdate: "2010/07/14",
    Salary: "$86,500",
  },
  {
    id: 55,
    Name: "Shad Decker",
    Position: "Regional Director",
    Office: "Edinburgh",
    Age: 51,
    Startdate: "2008/11/13",
    Salary: "$183,000",
  },
  {
    id: 56,
    Name: "Michael Bruce",
    Position: "Javascript Developer",
    Office: "Singapore",
    Age: 29,
    Startdate: "2011/06/27",
    Salary: "$183,000",
  },
  {
    id: 57,
    Name: "Donna Snider",
    Position: "Customer Support",
    Office: "New York",
    Age: 27,
    Startdate: "2011/01/25",
    Salary: "$112,000",
  },
];

export const admin_tabledata = [
  {
    no: "R00001",
    Patient_name: "Andrea Lalema",
    Img: blogimg2,
    Doctor: "Dr.Jenny Smith",
    time: "12.05.2022 at 7.00 PM",
    disease: "Fracture",
  },
  {
    no: "R00002",
    Patient_name: "Dr.Angelica Ramos",
    Img: blogimg4,
    Doctor: "Dr.Jenny Smith",
    time: "13.05.2022 at 7.00 PM",
    disease: "Fever",
  },
  {
    no: "R00003",
    Patient_name: "Dr.Martin Doe",
    Img: blogimg6,
    Doctor: "Dr.Jenny Smith",
    time: "14.05.2022 at 7.00 PM",
    disease: "Fracture",
  },
  {
    no: "R00004",
    Patient_name: "Dr.William Jerk",
    Img: blogimg10,
    Doctor: "Dr.Jenny Smith",
    time: "15.05.2022 at 7.00 PM",
    disease: "Fracture",
  },
  {
    no: "R00005",
    Patient_name: "Dr.Angelica Ramos",
    Img: blogimg12,
    Doctor: "Dr.Jenny Smith",
    time: "16.05.2022 at 7.00 PM",
    disease: "Fever",
  },
];
export const overviewKnob = {
  labels: ["", "", ""],
  dataUnit: "BTC",
  legend: false,
  datasets: [
    {
      borderColor: "transparent",
      backgroundColor: ["#6576ff", "#d9e5f7"],
      data: [220, 80],
    },
  ],
};