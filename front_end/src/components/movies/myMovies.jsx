import React from 'react';
import "./myMovies.css";
import { Badge, Button, Carousel, List, Space, Typography, FloatButton, Modal } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import FormMovie from './formMovie';

const { confirm } = Modal;

//==========================================
// This function is used to create the images for the carousel
// It receives the movie object and the index of the movie
// It returns a div with the image and the title with description and static badges
function ImageCorusel (movie,index) {
    const {url, title, description} = movie;
    const imageUrl = url !== "" ? url : "https://source.unsplash.com/random/800x600";
    return(<div key={index}>
        <div
        style={{
            backgroundImage:"linear-gradient(rgba(0,0,0,0.5) 50%,rgba(0,0,0,1) 98%),url("+imageUrl+")",
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
//==========================================

//==========================================
// All UI of page "My Movies" 1) Carousel 2) List of movies
export default function MyMovies() {

    // A hook to store the movies
    const [movies, setMovies] = useState([]);

    // An user can select a movie, so we need to store the index of the selected movie
    const [selectedMovie, setSelectedMovie] = useState(-1);

    // A hook to store the state of the modal (open or close) to add a movie or to edit one
    const [openForm, setOpenForm] = useState(false);

    // A hook to store the movies in the local storage without re-rendering (thanks UseMemo)
    const LocalMovies = useMemo(() => [
        { title: "Gato con Botas: El útimo deseo", url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/el-gato-con-botas-el-ultimo-deseo-poster-2-1671012941.jpg?crop=1xw:0.6xh;center,top&resize=1200:*",
        description: "Un gato con botas que quiere ser un gato normal, entra en una aventura para encontrar el tesoro de su familia." },
        { title: "Avatar 2: El camino del agua", url: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/07/avatar-2-scaled.jpg?fit=2560%2C1777&quality=50&strip=all&ssl=1",
        description: "La secuela de Avatar, donde Jake Sully, un ex-marine, se une a los Na'vi para protegerlos de los humanos. Los Na'vi son una raza de seres humanos que viven en el planeta Pandora." },
        { title: "BNHA: Two Heroes", url: "https://i.blogs.es/0afb29/bnha_anime/1366_2000.jpeg",
        description: "La historia de la película se centra en All Might y Deku, quienes se unen con otros héroes para salvar al mundo de un villano. Hay el final me encanta porque deku y Allmigth hicieron Double... detroittt SMASSHHH!!!" },
        { title: "Pinocchio", url: "https://www.mundiario.com/asset/thumbnail,1280,720,center,center/media/mundiario/images/2022/12/09/2022120921060316579.png",
        description: "La historia de un muñeco de madera que se convierte en un niño real." },
    ], []);

    // A hook to set the movies when the LocalMovies hook is updated
    useEffect(() => {
        setMovies(LocalMovies);
    }, [LocalMovies])

    // A function to handle the selection of a movie, if the movie is already selected, it will be unselected
    const handleSelectMovie = (index) => {
        if (selectedMovie === index) {
            setSelectedMovie(-1);
        } else {
            setSelectedMovie(index);
        }
    }

    // A function to handle the deletion of a movie, it will ask for confirmation
    const handleDeleteMovie = () => {
        if (selectedMovie !== -1) {
            confirm({
                title: '¿Estás seguro de eliminar esta película?',
                content: 'Esta acción no se puede deshacer. La pelicula "'+movies[selectedMovie].title+'" será eliminada de la lista.',
                okText: 'Sí',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                    const newMovies = movies.filter((movie, index) => index !== selectedMovie);
                    setMovies(newMovies);
                    setSelectedMovie(-1);
                },
            });
        }
    }

    const onOkForm = (fmovie) => {
        if (selectedMovie !== -1) {
            const newMovies = movies.map((movie, index) => {
                if (index === selectedMovie) {
                    return fmovie;
                } else {
                    return movie;
                }
            });
            setMovies(newMovies);
        } else {
            const newMovies = [...movies, fmovie];
            setMovies(newMovies);
        }
        setOpenForm(false);
    }

    return (<>
    {/* The carousel is created with the movies array, display movies with animation*/}
    <Carousel autoplay autoplaySpeed={3500}>
        {movies.length > 0 ?
            movies.map((movie, index) => {
                return ImageCorusel(movie,index);
            })
        :
            ImageCorusel({title:"No hay películas", url:"",description:"No hay películas en la db"}, 0)
        }
    </Carousel>

    <div style={{
        display: "flex",
        flexDirection: "column",
        padding: "30px",
        backgroundColor: "black",
    }}>
        <Typography.Title style={{ color: "white", textAlign: "center" }}>Mis Películas</Typography.Title>
        <List
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 4,
        }}
        dataSource={movies}
        renderItem={(movie,index) => (
            <List.Item>
                <div
                className='itemMovie'
                onClick={() => handleSelectMovie(index)}
                style={{
                    backgroundImage:"linear-gradient(rgba(0,0,0,0.5) 50%,rgba(0,0,0,1) 98%),url("+movie.url+")",
                    border: selectedMovie === index ? "2px solid #9E339F" : "0",
                }}>
                    <Typography.Title
                    style={{
                        margin:"0",
                        font:"bold 20px Comic Sans MS",
                        color:"white"
                    }}>
                        {movie.title}
                    </Typography.Title>
                </div>
            </List.Item>
        )}
        />
    </div>

    {/* The form to add or edit a movie is created, it is hidden 
    by default for evit render it when it is not necessary */}
    { openForm ? 
        <FormMovie
        mode={selectedMovie === -1 ? 0 : 1}
        open={openForm}
        onCancel={() => setOpenForm(false)}
        onOk={onOkForm}
        movie={selectedMovie === -1 ? {title:"",url:"",description:""} : movies[selectedMovie]}
        /> 
    : null}

    {/* The floating button group is created, it has a button to add a movie and 
    two buttons to edit and delete a movie */}
    <FloatButton.Group
    shape='square'
    style={{
        right: "30px",
    }}>
        { selectedMovie !== -1 ?
        
        <>
            <FloatButton 
            shape="square"
            onClick={handleDeleteMovie}
            description={
                <Typography.Title> - </Typography.Title>
            }/>
            <FloatButton 
            shape="square"
            onClick={() => setOpenForm(true)}
            description={
                <Typography.Title> l </Typography.Title>
            }/>
        </>
        :
            <FloatButton 
            shape="square"
            onClick={() => setOpenForm(true)}
            description={
                <Typography.Title> + </Typography.Title>
            }/>
        }
    </FloatButton.Group>

    </>);
}