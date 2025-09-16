import { ensureAuthenticated } from "../../realmClient"; // Mudança aqui

export async function find(nomeFuncaoAtlas: string, id: string) {
  try {
    const user = await ensureAuthenticated(); // Mudança aqui
    const doc: any = await user.functions[nomeFuncaoAtlas](id);
    
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
  } catch(error) {
    console.error(`Erro na função ${nomeFuncaoAtlas}:`, error);
    throw (error);
  }
}

export async function findAll(nomeFuncaoAtlas: string): Promise<any> {
  try {
    const user = await ensureAuthenticated(); // Mudança aqui
    const docs: any = await user.functions[nomeFuncaoAtlas]();
    
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
  } catch(error) {
    console.error(`Erro na função ${nomeFuncaoAtlas}:`, error);
    throw (error);
  }
}

export async function findAllBy(nomeFuncaoAtlas: string, arg: any): Promise<any> {
  try {
    const user = await ensureAuthenticated(); // Mudança aqui
    const docs: any = await user.functions[nomeFuncaoAtlas](arg);
    
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
  } catch(error) {
    console.error(`Erro na função ${nomeFuncaoAtlas}:`, error);
    throw (error);
  }
}

export async function insert(nomeFuncaoAtlas: string, dados: any) {
  try {
    const user = await ensureAuthenticated(); // Mudança aqui
    const doc = await user.functions[nomeFuncaoAtlas](dados);
    
    if (doc.success) {
      return {
        sucesso: true,
        doc: doc.insertedId
      }
    } else {
      return doc;
    }
  } catch(error) {
    console.error(`Erro na função ${nomeFuncaoAtlas}:`, error);
    throw (error);
  }
}

export async function update(nomeFuncaoAtlas: string, id: string, dados: any) {
  try {
    const user = await ensureAuthenticated(); // Mudança aqui
    const doc = await user.functions[nomeFuncaoAtlas](id, dados);
    
    if (!doc) {
      return {
        sucesso: false,
        mensagem: "Não foi possível atualizar"
      }
    } else if (!doc.success) {
      return {
        sucesso: false,
        mensagem: "Não foi possível atualizar"
      }
    } else {
      return {
        sucesso: true,
        doc: doc
      }
    }
  } catch(error) {
    console.error(`Erro na função ${nomeFuncaoAtlas}:`, error);
    throw (error);
  }
}