import { Router } from "express";
import * as nconf from "nconf";
import { StorageProvider } from "../../services";
import * as utils from "../utils";

export function create(store: nconf.Provider, provider: StorageProvider): Router {
    const router: Router = Router();

    router.post(provider.translatePath("/repos/:owner?/:repo/git/blobs"), (request, response, next) => {
        const blobP = provider.gitService.createBlob(request.params.owner, request.params.repo, request.body);
        utils.handleResponse(
            blobP,
            response,
            false,
            201);
    });

    /**
     * Retrieves the given blob from the repository
     */
    router.get(provider.translatePath("/repos/:owner?/:repo/git/blobs/:sha"), (request, response, next) => {
        const useCache = !("disableCache" in request.query);

        const blobP = provider.gitService.getBlob(
            request.params.owner,
            request.params.repo,
            request.params.sha,
            useCache);
        utils.handleResponse(
            blobP,
            response,
            useCache);
    });

    return router;
}
