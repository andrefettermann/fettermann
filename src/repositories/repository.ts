import { getLoggedInUser } from "../realmClient";

export async function find(nomeFuncaoAtlas: string, id: string) {
    try{
        const user = getLoggedInUser();
        const doc: any = await user.functions[nomeFuncaoAtlas](id)
        if (doc) {
            return {
                sucesso: true,
                doc: doc.result[0]
            }
        } else {
            return {
                sucesso: false,
                error: doc.result
            }
        }
    } catch(error){
        throw (error)
    }
}

export async function findAll(nomeFuncaoAtlas: string): Promise<any>{
    try{
        const user = getLoggedInUser();
        const docs: any = await user.functions[nomeFuncaoAtlas]()

        if (docs) {
            return {
                sucesso: true,
                docs: docs.result
            }
        } else {
            return {
                sucesso: false,
                error: docs.result
            }
        }
    } catch(error){
        throw (error)
    }
}

export async function insert(nomeFuncaoAtlas: string, dados: any){
    try {
        const user = getLoggedInUser();
        const doc = await user.functions[nomeFuncaoAtlas](dados)

        if (doc.success) {
            return {
                sucesso: true,
                doc: doc.insertedId
            }
        } else {
            return doc;
        }
    } catch(error){
        throw (error)
    }
};

export async function update(nomeFuncaoAtlas: string, id: string, dados: any){
    try{
        //const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})
        const user = getLoggedInUser();
        const doc = await user.functions[nomeFuncaoAtlas](id,dados)

        if(!doc){
            return {
                sucesso: false,
                mensagem: "Nao foi possivel atualizar"
            }
        } else if (!doc.success) {
            return {
                sucesso: false,
                mensagem: "Nao foi possivel atualizar"
            }
        } else {
            console.log(doc)
            return {
                sucesso: true,
                doc: doc
            }
        }

    } catch(error){
        throw (error)
    }
}
