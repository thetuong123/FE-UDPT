/*
const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_VER = process.env.REACT_APP_API_VER;
*/
// mockData.js

const BASE_URL = 'https://udpt-be.onrender.com';
const API_VER = 'api/v1';

//Login
export const loginUser = async (username, password) => {
  const loginData = new URLSearchParams();
  loginData.append('grant_type', 'password');
  loginData.append('username', username);
  loginData.append('password', password);

  const response = await fetch(`${BASE_URL}/${API_VER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: loginData.toString()
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  // Log data for debugging
  console.log('Login response data:', data);

  // Ensure 'access_token' exists in the response
  if (data.access_token) {
    localStorage.setItem('accessToken', data.access_token);
  } else {
    throw new Error('Access token not found in response');
  }

  return data;
};

//Logout
// MockData.js

export const logoutUser = async () => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    // Make a request to the logout API
    const response = await fetch(`${BASE_URL}/${API_VER}/logout`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to log out');
    }

    // Remove the access token from local storage
    localStorage.removeItem('accessToken');

    return true; // Indicate successful logout
  } catch (error) {
    console.error('Error logging out:', error);
    return false; // Indicate failure to log out
  }
};



//User
//User Info
export const fetchUserInfo = async () => {
  const token = localStorage.getItem('accessToken');  // Retrieve the token directly as a string

  if (!token) {
    throw new Error('No access token found. Please log in first.');
  }

  try {
    const response = await fetch(`${BASE_URL}/${API_VER}/users/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Use the token directly as a string
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorResponse = await response.text(); // Get error details as text
      console.error('Error response:', errorResponse);
      throw new Error('Failed to fetch user information');
    }

    const data = await response.json();
    console.log('User info response data:', data);  // Log data for debugging
    return data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

//MANAGE TEAM
//View Team
export const fetchTeamData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return result.data; // Assuming the API response has a 'data' key
  } catch (error) {
    console.error('Error fetching team data:', error);
    return []; // Return an empty array in case of error
  }
};


//Create new user
export const createUser = async (userData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`, // Include the access token in the Authorization header
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

//Delete User
export const deleteUser = async (userId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Include the access token in the Authorization header
      }
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


export const updateUser = async (userId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`, // Include the access token in the Authorization header
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
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/users/${userId}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json(); // Return the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return null; // Return null if fetch fails
  }
};


//ACTIVITIES
// View all activities
export const fetchActivitiesData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/activities/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

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
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/activities/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
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


// Update an activity by ID// Update an activity by ID
export const updateActivity = async (activityId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/activities/${activityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
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
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/activities/${activityId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch activity data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching activity:', error);
    return null;
  }
};

// TICKETS
// View all tickets
export const fetchTicketsData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching tickets data:', error);
    return [];
  }
};

// Create a new ticket
export const createTicket = async (ticketData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) {
      throw new Error('Failed to create ticket');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating ticket:', error);
    return null;
  }
};

// Update a ticket by ID
export const updateTicket = async (ticketId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update ticket');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating ticket:', error);
    return null;
  }
};

// Fetch a ticket by ID
export const fetchTicketById = async (ticketId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/tickets/${ticketId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch ticket data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return null;
  }
};


//Voucher
// View all vouchers
export const fetchVouchersData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/vouchers/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching vouchers data:', error);
    return [];
  }
};

// Create a new voucher
export const createVoucher = async (voucherData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/vouchers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(voucherData),
    });

    if (!response.ok) {
      throw new Error('Failed to create voucher');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating voucher:', error);
    return null;
  }
};

// Update a voucher by ID
export const updateVoucher = async (voucherId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/vouchers/${voucherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update voucher');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating voucher:', error);
    return null;
  }
};

// Fetch a voucher by ID
export const fetchVoucherById = async (voucherId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/vouchers/${voucherId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch voucher data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching voucher:', error);
    return null;
  }
};

//Exchange
// View all voucher exchanges
export const fetchVoucherExchangesData = async (page = 1, limit = 10) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching voucher exchanges data:', error);
    return [];
  }
};

// Create a new voucher exchange
export const createVoucherExchange = async (voucherExchangeData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(voucherExchangeData),
    });

    if (!response.ok) {
      throw new Error('Failed to create voucher exchange');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating voucher exchange:', error);
    return null;
  }
};

// Update a voucher exchange by ID
export const updateVoucherExchange = async (voucherExchangeId, updatedData) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/${voucherExchangeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update voucher exchange');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating voucher exchange:', error);
    return null;
  }
};

// Fetch a voucher exchange by ID
export const fetchVoucherExchangeById = async (voucherExchangeId) => {
  try {
    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${BASE_URL}/${API_VER}/voucher_exchanges/${voucherExchangeId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch voucher exchange data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching voucher exchange:', error);
    return null;
  }
};
