import { Typography, Space, Badge, Button } from "antd";

//==========================================
// This function is used to create the images for the carousel
// It receives the movie object and the index of the movie
// It returns a div with the image and the title with description and static badges
export default function ImageCorusel (movie,index) {
    const {url, title, description} = movie;

    return(<div key={index}>
        <div
        style={{
            backgroundImage:"linear-gradient(rgba(0,0,0,0.5) 50%,rgba(0,0,0,1) 98%),url("+url+")",
            backgroundSize:"cover",
            backgroundPosition:"center",
            height:"450px",
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-end",
            padding:"30px"
        }}>
            <Typography.Title
            style={{
                margin:"0",
                font:"bold 50px Comic Sans MS",
                color:"white"
            }}>
                {title}
            </Typography.Title>
            <br/>

            <Space>
                <Badge count="Nueva" style={{backgroundColor: "#9E339F" }}/>
                <Badge count="Full HD" style={{backgroundColor: "#9E339F", border: "0" }}/>
            </Space>

            <br/>
            <Typography.Paragraph
            style={{
                margin:"0",
                font:"bold 20px Calibri",
                color:"rgba(255,255,255,0.8)"
            }}>
                {description}
            </Typography.Paragraph>

            <br/>
            <Button type="primary" style={{
                width:"150px"
            }}> Añadir a favoritos </Button>
            <br/>
        </div>
    </div>)
}