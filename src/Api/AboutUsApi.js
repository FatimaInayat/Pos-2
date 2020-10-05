import axios from 'axios';

export function  GetAllAboutUs()
{
    return axios.get(process.env.REACT_APP_BASEURL + 'api/about-us');
}

export function  GetSingleAboutUs(Id)
{
    return axios.get(process.env.REACT_APP_BASEURL + 'api/about-us/' + Id);
}

export function  SaveAboutUs(AboutUsObject)
{
  debugger;
  var bodyFormData = new FormData();
  bodyFormData.append('title', AboutUsObject.title);
  bodyFormData.append('description', AboutUsObject.description);
  bodyFormData.append('image', AboutUsObject.image);

  return axios({
    method: 'post',
    url: process.env.REACT_APP_BASEURL + 'api/about-us',
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function  DeletelAboutUs(Id)
{
  return axios.delete(process.env.REACT_APP_BASEURL + 'api/about-us/' + Id);
}
