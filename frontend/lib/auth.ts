import axios from 'axios';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
    data
  );
  return response.data;
};