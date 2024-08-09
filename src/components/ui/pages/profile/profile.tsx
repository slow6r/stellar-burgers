import { FC, ReactEventHandler, useState, useRef } from 'react';

import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';
import commonStyles from '../common.module.css';

import { ProfileUIProps } from './type';
import { ProfileMenu } from '@components';

export const ProfileUI: FC<ProfileUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const [isEditName, setIsEditName] = useState(true);
  const [isEditEmail, setIsEditEmail] = useState(true);
  const [isEditPass, setIsEditPass] = useState(true);
  const handleEditName = () => {
    setIsEditName(!isEditName);
    setIsEditEmail(true);
    setIsEditPass(true);
    setTimeout(() => nameRef.current!.focus(), 0);
  };
  const onNameBlur = () => {
    setIsEditName(true);
  };
  const handleEditEmail = () => {
    setIsEditName(true);
    setIsEditEmail(!isEditEmail);
    setIsEditPass(true);
    setTimeout(() => emailRef.current!.focus(), 0);
  };
  const onEmailBlur = () => {
    setIsEditEmail(true);
  };
  const handleEditPass = () => {
    setIsEditName(true);
    setIsEditEmail(true);
    setIsEditPass(!isEditPass);
    setTimeout(() => passRef.current!.focus(), 0);
  };
  const onPassBlur = () => {
    setIsEditPass(true);
  };
  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${styles.form} ${commonStyles.form}`}
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              ref={nameRef as any}
              type={'text'}
              placeholder={'Имя'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={handleEditName}
              disabled={isEditName}
              onBlur={onNameBlur}
            />
          </div>
          <div className='pb-6'>
            <Input
              ref={emailRef as any}
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={handleEditEmail}
              disabled={isEditEmail}
              onBlur={onEmailBlur}
            />
          </div>
          <div className='pb-6'>
            <Input
              ref={passRef as any}
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleInputChange}
              value={formValue.password}
              name={'password'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onIconClick={handleEditPass}
              disabled={isEditPass}
              onBlur={onPassBlur}
            />
          </div>
          {isFormChanged && (
            <div className={styles.button}>
              <Button
                type='secondary'
                htmlType='button'
                size='medium'
                onClick={handleCancel}
              >
                Отменить
              </Button>
              <Button type='primary' size='medium' htmlType='submit'>
                Сохранить
              </Button>
            </div>
          )}
          {updateUserError && (
            <p
              className={`${commonStyles.error} pt-5 text text_type_main-default`}
            >
              {updateUserError}
            </p>
          )}
        </>
      </form>
    </main>
  );
};
