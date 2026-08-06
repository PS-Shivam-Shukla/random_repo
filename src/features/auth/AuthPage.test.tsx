import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { AuthPage } from './AuthPage';
import { authApi } from '../../services/auth.api';

vi.mock('../../services/auth.api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
  },
}));

const mockedLogin = vi.mocked(authApi.login);

describe('AuthPage', () => {
  it('submits login credentials', async () => {
    mockedLogin.mockResolvedValue({
      access_token: 'token',
      token_type: 'bearer',
      user: {
        id: 'user-1',
        email: 'jane@example.com',
        full_name: 'Jane Doe',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    });

    render(
      <MemoryRouter>
        <AuthPage />
      </MemoryRouter>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith({ email: 'jane@example.com', password: 'secret123' });
    });
  });
});
