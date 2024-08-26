/*
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = process.env.REACT_APP_API_VER;
*/
const BASE_URL = 'https://udpt-be.onrender.com';
const API_VER = 'api/v1';

// Fetch team data
export const fetchTeamData = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/?page=${page}&limit=${limit}`);
    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error('Error fetching team data:', error);
    return []; // Return an empty array in case of error
  }
};
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const result = await response.json();
    console.log("API response:", result); // Log the response for debugging
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error("Error creating user:", error);
    return null; // Return null in case of error
  }
};


// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false; // Return false if deletion fails
  }
};

// Update a user by ID
export const updateUser = async (userId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json(); // Return the updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    return null; // Return null if update fails
  }
};
export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json(); // Trả về dữ liệu người dùng
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; // Trả về null nếu fetch thất bại
  }
};

// View all activities
export const fetchActivitiesData = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/activities/?page=${page}&limit=${limit}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching activities data:', error);
    return [];
  }
};


// Create a new activity
export const createActivity = async (activityData) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/activities/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activityData),
    });

    if (!response.ok) {
      throw new Error('Failed to create activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating activity:', error);
    return null;
  }
};

// Update an activity by ID
export const updateActivity = async (activityId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/activities/${activityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    return null;
  }
};

// Fetch an activity by ID
export const fetchActivityById = async (activityId) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/activities/${activityId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch activity data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
};

// Fetch requests by user ID
export const fetchRequestData = async (userId, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/?user_id=${userId}&page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch request data');
    }
    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error('Error fetching request data:', error);
    return [];
  }
};


// Update an Request by ID
export const updateRequest = async (ticketId, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update Request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating Request:', error);
    return null;
  }
};



// Function to fetch work logs by work_logs_id
export const fetchWorkLogById = async (work_logs_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/work-logs/${work_logs_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching work log with ID ${work_logs_id}`);
    }
    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// Function to fetch work logs by user_id
export const fetchWorkLogsByUserId = async (user_id) => {
  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/work-logs/user/${user_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching work logs for user with ID ${user_id}`);
    }
    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};




export const AdminDashBoard = [
  {
    id: 1,
    name: "ADMIN TEMP",
    dob:"1/1/1995",
    gender:"Male",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address:"VN"
  }
];
export const EmployeeDashBoard = [
  {
    id: 1,
    name: "Employee Temp",
    dob:"1/1/1995",
    gender:"Male",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address:"VN"
  }
];