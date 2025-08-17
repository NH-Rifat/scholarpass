export const gradeLevels = [
  { label: "Select grade level", value: "" },
  { label: "3rd Grade", value: "3rd" },
  { label: "4th Grade", value: "4th" },
  { label: "5th Grade", value: "5th" },
  { label: "6th Grade", value: "6th" },
  { label: "7th Grade", value: "7th" },
  { label: "8th Grade", value: "8th" },
  { label: "9th Grade", value: "9th" },
  { label: "10th Grade", value: "10th" },
  { label: "11th Grade", value: "11th" },
  { label: "12th Grade", value: "12th" },
];

export const relationships = [
  { label: "Select relationship", value: "" },
  { label: "Parent", value: "parent" },
  { label: "Guardian", value: "guardian" },
  { label: "Grandparent", value: "grandparent" },
  { label: "Sibling", value: "sibling" },
  { label: "Other", value: "other" },
];

export const states = [
  { label: "Search for your State", value: "" },
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

// Mock institute data for fallback/development
export const mockInstitutes = [
  {
    id: 1,
    name: "Harvard University",
    city: "Cambridge",
    state: { name: "Massachusetts" },
    address: "1350 Massachusetts Ave",
  },
  {
    id: 2,
    name: "Stanford University",
    city: "Stanford",
    state: { name: "California" },
    address: "450 Serra Mall",
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    city: "Cambridge",
    state: { name: "Massachusetts" },
    address: "77 Massachusetts Ave",
  },
  {
    id: 4,
    name: "University of California, Berkeley",
    city: "Berkeley",
    state: { name: "California" },
    address: "110 Sproul Hall",
  },
  {
    id: 5,
    name: "Yale University",
    city: "New Haven",
    state: { name: "Connecticut" },
    address: "165 Whitney Ave",
  },
];

// Mock state data for fallback/development
export const mockStates = [
  { id: 1, name: "Alabama", ticker: "AL" },
  { id: 2, name: "Alaska", ticker: "AK" },
  { id: 3, name: "Arizona", ticker: "AZ" },
  { id: 4, name: "Arkansas", ticker: "AR" },
  { id: 5, name: "California", ticker: "CA" },
  { id: 6, name: "Colorado", ticker: "CO" },
  { id: 7, name: "Connecticut", ticker: "CT" },
  { id: 8, name: "Delaware", ticker: "DE" },
  { id: 9, name: "Florida", ticker: "FL" },
  { id: 10, name: "Georgia", ticker: "GA" },
  { id: 11, name: "Illinois", ticker: "IL" },
  { id: 12, name: "Indiana", ticker: "IN" },
  { id: 13, name: "Iowa", ticker: "IA" },
  { id: 14, name: "Kansas", ticker: "KS" },
  { id: 15, name: "Kentucky", ticker: "KY" },
  { id: 16, name: "Louisiana", ticker: "LA" },
  { id: 17, name: "Maine", ticker: "ME" },
  { id: 18, name: "Maryland", ticker: "MD" },
  { id: 19, name: "Massachusetts", ticker: "MA" },
  { id: 20, name: "Michigan", ticker: "MI" },
  { id: 21, name: "Minnesota", ticker: "MN" },
  { id: 22, name: "Mississippi", ticker: "MS" },
  { id: 23, name: "Missouri", ticker: "MO" },
  { id: 24, name: "Montana", ticker: "MT" },
  { id: 25, name: "Nebraska", ticker: "NE" },
  { id: 26, name: "Nevada", ticker: "NV" },
  { id: 27, name: "New Hampshire", ticker: "NH" },
  { id: 28, name: "New Jersey", ticker: "NJ" },
  { id: 29, name: "New Mexico", ticker: "NM" },
  { id: 30, name: "New York", ticker: "NY" },
  { id: 31, name: "North Carolina", ticker: "NC" },
  { id: 32, name: "North Dakota", ticker: "ND" },
  { id: 33, name: "Ohio", ticker: "OH" },
  { id: 34, name: "Oklahoma", ticker: "OK" },
  { id: 35, name: "Oregon", ticker: "OR" },
  { id: 36, name: "Pennsylvania", ticker: "PA" },
  { id: 37, name: "Rhode Island", ticker: "RI" },
  { id: 38, name: "South Carolina", ticker: "SC" },
  { id: 39, name: "South Dakota", ticker: "SD" },
  { id: 40, name: "Tennessee", ticker: "TN" },
  { id: 41, name: "Texas", ticker: "TX" },
  { id: 42, name: "Utah", ticker: "UT" },
  { id: 43, name: "Vermont", ticker: "VT" },
  { id: 44, name: "Virginia", ticker: "VA" },
  { id: 45, name: "Washington", ticker: "WA" },
  { id: 46, name: "West Virginia", ticker: "WV" },
  { id: 47, name: "Wisconsin", ticker: "WI" },
  { id: 48, name: "Wyoming", ticker: "WY" },
];

export const courses = [
  {
    id: "physical-education",
    title: "Physical Education",
    description:
      "The Physical Education course is designed to introduce students to essential locomotor, non-locomotor, and manipulative skills, fostering a comprehensive understanding of physical activity and its benefits. Through a series of modules, students will engage...",
  },
  {
    id: "social-studies",
    title: "Social Studies",
    description:
      "This Social Studies course is designed to introduce students to the essential components of their society and the world around them. Through engaging modules, students will learn about the concept of family, the roles of community helpers, and the importance of...",
  },
  {
    id: "art",
    title: "Art",
    description:
      "In this comprehensive art course, students will explore the expanded elements of art, including line, shape, color, texture, form, and space. They will learn the principles of design, such as pattern, balance, rhythm, and movement. Through hands-on techniques in...",
  },
];

export const scholarshipPrograms = [
  {
    id: "test-scholarship-1",
    title: "Test Scholarship 1",
    description: "<p>Testing</p>",
    amount: "$300",
    deadline: "8/23/2025",
  },
  {
    id: "test-scholarship-2",
    title: "Test Scholarship 2",
    description: "<p>gggggggggggggggggggggggggggggggg</p>",
    amount: "$100",
    deadline: "8/23/2025",
  },
];

export const stepTitles = [
  "Student Information",
  "Guardian Information",
  "Financial Information",
  "Course Selection",
  "Application Essay",
];

export const essayGuidelines = [
  "Explain why you're applying for this scholarship",
  "Describe your educational goals and how this scholarship will help you achieve them",
  "Share any challenges you've overcome in your educational journey",
  "Highlight your achievements and strengths",
];

export const essayTips = [
  "Be specific and provide examples",
  "Proofread for grammar and spelling errors",
  "Stay focused on how the scholarship will help you achieve your goals",
  "Be authentic and let your personality shine through",
];

export const whatWeLookFor = [
  "Clear educational goals",
  "Demonstrated commitment to learning",
  "Financial need",
  "Potential for academic success",
];
