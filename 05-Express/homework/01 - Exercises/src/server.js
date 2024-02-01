const express = require("express");

let publications = [];
let id = 0;
const server = express();
server.use(express.json());

// RUTA POST
server.post("/posts", (req, res) => {
    const { author, title, contents } = req.body;
    if(author && title && contents){
        const publication = {
            author,
            title,
            contents,
            id: ++id
        }
     publications.push(publication)
     return res.status(201).json(publications);

    } else {
    return  res
    .status(404)
    .json({error: "No se recibieron los parámetros necesarios para crear la publicación"})}
})





//GET ruta `/posts?author=${author}?title={title}`.
server.get("/posts", (req, res) => {
     const { author, title } = req.query;

     if(author && title){
        const filterPublications = publications.filter(
            publication => publication.author === author
             && publication.title === title
        );
        if(filterPublications.length){
            return res.status(200).json(filterPublications);
        }else{
            return res
            .status(400)
            .json({
                error:
                "No existe ninguna publicación con dicho título y autor indicado"
    
            });
        }

     } else {
       return res.status(400).json({
        error:
        "Faltan datos..."
       })
     }
});

//GET ruta /posts/:author
server.get("/posts/:author", (req, res) => {
    const { author } = req.params;
    const filteredPublications = publications.filter(
        (publication) => 
        publication.author === publication.author === author
    );
    if(filteredPublications.length) {
        return res.status(200).json(filteredPublications);
    }
    res.status(404).json({
        error: 
      "No existe ninguna publicación del autor indicado"
    })
})

// PUT ruta /posts/:id
server.put("/posts/:id", (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if(title && contents){
     let filteredPublications = publications.find(
        publication => publication.id === Number(id)
     );
     if(!filteredPublications){
       res.status(404).json({
        error:
        "No se recibió el id correcto necesario para modificar la publicación"

       })
     } else {
    //    filteredPublications.title = title;
    //    filteredPublications.contents = contents;
       filteredPublications = {... filteredPublications, title, contents};
       res.status(200).json(filteredPublications);
     }



    } else {
        return res.status(400).json({
            error:
            "No se recibieron los parámetros necesarios para modificar la publicación" })
    }

})






// /posts/:id
server.delete("/posts/:id", (req, res) => {
    const { id } = req.params;

    if(!id){
        res.status(404).json({
            error: 
            "No se recibió el id correcto necesario para eliminar la publicación"

        })
    } else {
        let filteredPublications = publications.filter(
            publication => publication.id !== Number(id)
        );
        if( publications.length === filteredPublications.length){
              res.status(404).json({
                error:
                "No se recibió el id correcto necesario para eliminar la publicación"

              })
        } else {
            publications = filteredPublications;
            res.status(200).json({ success: true})
        }
    }
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
