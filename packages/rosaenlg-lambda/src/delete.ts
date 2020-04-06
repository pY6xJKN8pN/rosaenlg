import { Context, Callback } from 'aws-lambda';
import { S3RosaeContextsManager } from 'rosaenlg-server-toolkit';
import { createS3rosaeContextsManager, getUserAndCheckSecretKey, corsHeaders } from './helper';

let s3rosaeContextsManager: S3RosaeContextsManager = null;

exports.handler = function (event: any, _context: Context, callback: Callback): void {
  getUserAndCheckSecretKey(event, callback, (user: string): void => {
    if (s3rosaeContextsManager == null) {
      s3rosaeContextsManager = createS3rosaeContextsManager(null, false);
    }

    const templateId: string = event.pathParameters.templateId;

    console.log({ user: user, templateId: templateId, action: 'delete', message: `start delete...` });

    // we cannot delete in cache, as the cache is in another lambda
    s3rosaeContextsManager.deleteFromBackend(s3rosaeContextsManager.getFilename(user, templateId), (err: Error) => {
      if (err) {
        const response = {
          statusCode: '204',
          headers: corsHeaders,
          body: err.message,
        };
        callback(null, response);
        return;
      } else {
        const response = {
          statusCode: '204',
          headers: corsHeaders,
        };
        callback(null, response);
        return;
      }
    });
  });
};