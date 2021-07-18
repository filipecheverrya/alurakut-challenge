import { HomeRequest } from 'helpers/apollo';

export default async (request, response) => {
  switch (request.method) {
    case 'POST':
      console.log(response.body);
      return response.status(200).send({
        message: 'Route FOUND BOOOYYY!!',
      });

    case 'GET':
      const { data: { allCommunities } } = await HomeRequest;
      return response.status(200).send({
        data: allCommunities,
      });
  
    default:
      return response.status(404).send({
        message: 'Route not found',
      });
  }
}