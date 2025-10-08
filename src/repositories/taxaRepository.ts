// taxaRepository.ts
import { Taxa, ITaxa } from "../models/taxa";
import { connectDB } from "../db";

/**
 * Repositorio para taxa.
 * 
 * @author Andre Fettermann
 */

export async function find(id: string) {
    try {
        await connectDB();
        const response: ITaxa[] | null = await Taxa.findById(id);
        if (response) {
            return {
                sucesso: true,
                doc: response[0]
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao ler os dados"
            }
        }
    }  catch(error) {
        throw error;
    }
}

export async function findAll(){
    try{
        await connectDB();

        const result: ITaxa[] = await Taxa.find({});
                //Graduacao.find({}).sort({ sequencia: 1 }).lean();
        if (result) {
            return {
                sucesso: true,
                docs: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao ler os dados"
            }
        }
    } catch(error){
        throw error;
    }
}

export async function insert(data: any){
    try {
        await connectDB();

        const result: any = await Taxa.create(data);
        if (result) {
            return {
                sucesso: true,
                id: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao incluir os dados"
            }
        }
    } catch (error) {
        throw error;
    }
};

export async function update(id: string, data: any){
    try{
        await connectDB();

        const result = 
            await Taxa.findByIdAndUpdate({"_id":id}, data, {new: true})
        if(result){
            return {
                sucesso: true,
                total_modificado: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao atualizar os dados"
            }
        }
    } catch(error){
        throw error;
    }
}

export async function deleteGraduacao(id: String) {
    try {
        await connectDB();
        const result = await Taxa.deleteOne({"_id":id});
        return result;
    } catch(error){
        return error;
    }

}