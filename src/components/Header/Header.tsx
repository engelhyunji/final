import React, { useState } from "react";
import NoLineLink from "../NoLineLink";
import * as St from './style';


const Header: React.FC = () => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogout = () => {
        setIsLogin(false);
    };
    return (
        <St.HeaderContainer>
            <NoLineLink to = "/"><h1>와르와르</h1></NoLineLink>
            <NoLineLink to = "/login">
                {isLogin ? "로그아웃" : "로그인"}
            </NoLineLink>
            {isLogin && (
                <button onClick={handleLogout}>로그아웃</button>
            )}
        </St.HeaderContainer>
        );
};

export default Header;
