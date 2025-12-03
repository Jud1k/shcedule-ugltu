import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerFormSchema } from '../api/auth-user';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/generic/FormInput';
import useAuth from '@/hooks/useAuth';

export const RegisterForm = () => {
  const { registerMutation, loginMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync(data);
    await loginMutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors.root && (
              <div
                role="alert"
                className="alert alert-error alert-outline w-full max-w-xs"
              >
                <span>{errors.root.message}</span>
              </div>
            )}
            <div className="form-control w-full max-w-xs">
              <FormInput
                label="Почта"
                type="email"
                placeholder="Введите почту"
                errorText={errors.email?.message}
                registration={register('email')}
              />
              <FormInput
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                errorText={errors.password?.message}
                registration={register('password')}
              />
              <FormInput
                label="Повторите пароль"
                type="password"
                placeholder="Повторите пароль"
                errorText={errors.repeat_password?.message}
                registration={register('repeat_password')}
              />
            </div>
            <div className="form-control mt-6 w-full max-w-xs">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm">Есть учетная запись? </span>
            <Link to="/login" className="link link-primary text-sm">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
