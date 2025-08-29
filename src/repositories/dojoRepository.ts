import { getLoggedInUser } from "../realmClient";

export async function find(id: string) {
    try{
        const user = getLoggedInUser();
        const doc: any = await user.functions['GetDojo'](id)
        
        return {
            sucess: true,
            docs: doc.result
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
}

export async function findAll(): Promise<any>{
    try{
        const user = getLoggedInUser();
        const docs: any = await user.functions['GetDojos']()
        
        return {
            sucess: true,
            docs: docs.result
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
}

export async function insert(data: any){
    try {
        const user = getLoggedInUser();
        const doc = await user.functions['PostDojo'](data)

        if (doc.success) {
            return {
                sucess: true,
                doc: doc.result
            }
        } else {
            return doc;
        }
    } catch(error){
        return {
            sucess: false,
            error: error
        }
    }
};

export async function update(id: string, data: any){
    try{
        //const dojo = await Dojo.findByIdAndUpdate({"_id":id}, data, {new: true})
        const user = getLoggedInUser();
        const doc = await user.functions['PatchDojo'](id,data)

        if(!doc){
            return {
                status: "Failed",
                message: "Post not available"
            }
        } else if (!doc.success) {
            return {
                status: "Failed",
                message: "Post not available"
            }
        } else {
            return doc;
        }

    }
    catch(error){
        return error;
    }
}
