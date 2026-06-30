import {Router} from "express";
import { getProducts, getSearchSuggestions } from "../controllers/search.controller.js"; // <-- nueva función
import { validateSearch } from "../midlewares/validateSearch.js";
import { productSearchSchema, searchSuggestionsSchema } from "../schemas/search.schemas.js"; // <-- nuevo schema

const router = Router();

//************************************ */
//         Buscador               
//************************************ */

//buscar productos 
router.get('/search',validateSearch(productSearchSchema), getProducts);

//obtener sugerencias rápidas para autocompletado en la barra de búsqueda
router.get('/search/suggestions', validateSearch(searchSuggestionsSchema), getSearchSuggestions);


export default router;