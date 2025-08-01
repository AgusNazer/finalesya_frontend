import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// GET /api/exam
export const getExams = async () => {
  const res = await axios.get(`${API_URL}/exams`);
  return res.data;
};

// POST /api/exam
export const createExam = async (exam) => {
  const res = await axios.post(`${API_URL}/exams`, exam);
  return res.data;
};

// DELETE /api/exam/{id}
export const deleteExam = async (id) => {
  await axios.delete(`${API_URL}/exams/${id}`);
};
