// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API: 'http://127.0.0.1:8888',
  BASE_URL: '/3bi'
}

export const _Url = ''; // 'http://backend.unibetaedu.com';
// 'http://127.0.0.1:8888';

export const _fetchRetryCount = 1 ;
export const _uploadEndPoint = environment.BASE_URL + '/upload';
export const _MainUrlImage = environment.API ;
export const defaultProfilePictureLocation = environment.API + '/storage/images/students/default.png';
export const defaultProfilePictureForGirl = environment.API + '/storage/images/students/girl.png';
export const defaultProfilePictureForBoy = environment.API + '/storage/images/students/boy.jpg';
