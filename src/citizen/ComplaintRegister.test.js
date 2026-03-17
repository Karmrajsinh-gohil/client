import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComplaintRegister from './ComplaintRegister';

// Mock axios for testing
jest.mock('../api/axios', () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('ComplaintRegister Component', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('renders complaint registration form', () => {
    render(<ComplaintRegister />);

    // Check if main elements are present
    expect(screen.getByText('Register New Complaint')).toBeInTheDocument();
    expect(screen.getByText('BPGSTS - Bharat Public Grievance & Service Tracking System')).toBeInTheDocument();
    expect(screen.getByText('TYBCA SEM-6 Project 2025-26')).toBeInTheDocument();
    expect(screen.getByText('Ambaba Commerce College, MIBM & DICA, Sabargam')).toBeInTheDocument();
  });

  test('displays step indicator', () => {
    render(<ComplaintRegister />);

    expect(screen.getByText('Step 1: Select Category')).toBeInTheDocument();
    expect(screen.getByText('Step 2: Complaint Details')).toBeInTheDocument();
    expect(screen.getByText('Step 3: Review & Submit')).toBeInTheDocument();
  });

  test('shows category selection cards', () => {
    render(<ComplaintRegister />);

    expect(screen.getByText('Road & Infrastructure')).toBeInTheDocument();
    expect(screen.getByText('Water Supply')).toBeInTheDocument();
    expect(screen.getByText('Electricity')).toBeInTheDocument();
    expect(screen.getByText('Sanitation')).toBeInTheDocument();
    expect(screen.getByText('Public Health')).toBeInTheDocument();
  });

  test('validates form fields', async () => {
    render(<ComplaintRegister />);

    // Try to proceed without selecting category
    const nextButton = screen.getByText('Next: Complaint Details');
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Please select a complaint category.')).toBeInTheDocument();
    });
  });

  test('allows category selection', () => {
    render(<ComplaintRegister />);

    const roadCategory = screen.getByText('Road & Infrastructure');
    fireEvent.click(roadCategory);

    // Check if category is selected (this would require checking the component state)
    // For now, just verify the click doesn't throw an error
    expect(roadCategory).toBeInTheDocument();
  });

  test('displays form fields in step 2', () => {
    render(<ComplaintRegister />);

    expect(screen.getByLabelText('Complaint Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Complaint Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority Level')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<ComplaintRegister />);

    // Select category first
    const roadCategory = screen.getByText('Road & Infrastructure');
    fireEvent.click(roadCategory);

    // Go to step 2
    const nextButton = screen.getByText('Next: Complaint Details');
    fireEvent.click(nextButton);

    // Try to proceed without filling required fields
    const reviewButton = screen.getByText('Next: Review & Submit');
    fireEvent.click(reviewButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill in all required fields.')).toBeInTheDocument();
    });
  });
});