const partyModel = require("../models/party");

function checkPartyBudget (budget, services){

    const priceSum = services.reduce((sum, service)=> sum + service.price, 0)

    if(priceSum > budget){
        return false;
    }
    return true;
}

const partyController = {
    create: async (req, res) => {
        try {
           const party = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            budget: req.body.budget,
            image: req.body.image,
            services: req.body.services,
           }

           if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "o seu orçamento é insuficiente."})
                return;
           }

           const response = await partyModel.create(party)

             res
                .status(201)
                .json({response, msg: "Festa criada com sucesso!"})
                
                
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res)=>{
        try {
            const parties = await partyModel.find()
            res.json(parties)
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) =>{
        try {
            const id = req.params.id;

            const partie = await partyModel.findById(id);

            if(partie === null){
                res.status(404).json({ msg: "serviço não encontrado!"})
                return;
            }

            res.json(partie)

        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) =>{
        try {
            
            const id = req.params.id;
            const partie = await partyModel.findById(id)

            if(partie === null){
                res.status(404).json({msg: "serviço não encontrado"})
                return;
            }

            const deletedPartie = await partyModel.findByIdAndDelete(id);

            res.status(200)
            .json({deletedPartie,msg: "serviço excluido com sucesso"});

        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) =>{
        try {
            
            const id = req.params.id;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
               }


               if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "o seu orçamento é insuficiente."})
                return;
                }

               const updatePartie = await partyModel.findByIdAndUpdate(id, party)

               if(updatePartie === null){
                res.status(404).json({msg: "serviço não encontrado"})
                return;
               }

               res.status(200).json({party, msg: "serviço atualizado com sucesso!"})

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = partyController;