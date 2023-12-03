import React, { useState } from 'react';
import { userLogin } from '../../apis/api/user';
import * as St from './style';


const Login: React.FC = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

    const handleLogin = async () => {
      if (!email || !password) {
        alert('이메일 비밀번호를 입력해주세요🐶');
        return;
      }
      await userLogin(email, password);
    };

    return (
      <St.LoginContainer>
        <St.LoginBox>
        <h2>로그인</h2>
        <St.LoginForm onSubmit={(e) => e.preventDefault()}>
            <St.LoginInput
              type="text"
              id="email"
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <St.LoginInput
              type="password"
              id="password"
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <St.LoginBtn type="button" onClick={handleLogin}>
            로그인하기
          </St.LoginBtn>
        </St.LoginForm>
        </St.LoginBox>
      </St.LoginContainer>
    );
};

export default Login;
