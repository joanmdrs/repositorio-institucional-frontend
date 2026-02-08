import { Layout } from "antd";
import type React from "react";
const { Footer } = Layout;

const CustomFooterStyle: React.CSSProperties = {
    backgroundColor: "#F5F5F5",
    height: 70,
    lineHeight: "64px",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    fontSize: "12px"
};

function CustomFooter() {
    return (
        <Footer style={CustomFooterStyle}>
            <span style={{ color: "#666" }}> Desenvolvido por Joan Medeiros </span>
            <span style={{ color: "#666" }}> | </span>
            <span style={{ color: "#666" }}>
                Todos os direitos reservados • {new Date().getFullYear()} 
            </span>

            {/* <a href="/privacy" style={{ color: "#1677ff" }}>
                Privacidade
            </a>

            <a href="/terms" style={{ color: "#1677ff" }}>
                Termos de Uso
            </a> */}
        </Footer>
    );
}

export default CustomFooter;
