import React, { useState } from 'react';
import { userLogin } from '../../apis/api/user';


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
      <div>
        <h2>로그인</h2>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            로그인하기
          </button>
        </form>
      </div>
    );
};

export default Login;
