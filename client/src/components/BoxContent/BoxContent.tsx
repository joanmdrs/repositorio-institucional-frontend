
const boxContentStyle = {
    padding: '10px',
}

function BoxContent({ children }: { children: React.ReactNode }) {
    return (
        <div style={boxContentStyle}>
            {children}
        </div>
    )
}

export default BoxContent