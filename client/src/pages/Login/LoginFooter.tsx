import type React from "react";

const loginFooterStyle: React.CSSProperties = {
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

function LoginFooter() {
    return (
        <footer style={loginFooterStyle}>
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
        </footer>
    );
}

export default LoginFooter;
