import React from 'react';
import Head from 'next/head';
import MainGrid from 'components/MainGrid'
import Box from 'components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from 'libs/AlurakutCommons';
import { ProfileSidebar } from 'components/Profile'
import { ProfileRelationsBoxWrapper } from 'components/Profile/Relations';
import ChampionsJSON from 'mocks/champions.json'
import { HomeRequest } from 'helpers/apollo';

const Home = () => {
  const BASE_URL_ASSET_SQUARE = process.env.NEXT_BASE_URL_ASSET_SQUARE;
  const RANDOM_USER = process.env.NEXT_RANDOM_USER;
  const [currentForm, setCurrentForm] = React.useState('')
  const [community, setcommunity] = React.useState([]);
  const allChampionsLength = Object.keys(ChampionsJSON.data).length;
  const allChampions = [
    'Sett',
    'Ryze',
    'Sivir',
    'Teemo',
    'Veigar',
    'Zed',
  ]

  async function registerCommunity() {

  }

  function handleCriaComunidade(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const image = formData.get('image');
    if (!title || !image) return null;

    const comunidade = {
      id: new Date().toISOString(),
      title,
      image,
    };

    const communityUpdated = [...community, comunidade];
    console.log(communityUpdated);
  }

  React.useEffect(() => {
    fetch('/api/community', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      const { data: allCommunities } = await response.json();
      setcommunity(allCommunities);
    })
  }, []);

  return (
    <>
      <Head>
        <title>League of Orkut</title>
      </Head>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={RANDOM_USER} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo(a) 
            </h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <div className="navWrapper">
              <button type="button" onClick={() => setCurrentForm('community')}>Criar comunidade</button>
              <button type="button" onClick={() => setCurrentForm('post')}>Criar postagem</button>
            </div>
            <form onSubmit={handleCriaComunidade} hidden={currentForm !== 'community'}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade? *"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa *"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button type="submit">
                Criar
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({community.length})
            </h2>
            <ul>
              {community.length ? community.map(({ id, title, image }) => {
                return (
                  <li key={id}>
                    <a href={`/users/${id}`}>
                      <img src={image.url} />
                      <span>{title}</span>
                    </a>
                  </li>
                )
              }) : null}
            </ul>
            <a className="linkBottom" href={`/community`}>Todas as comunidades</a>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Heróis da comunidade ({allChampionsLength})
            </h2>

            <ul>
              {allChampions.map((hero) => {
                return (
                  <li key={hero}>
                    <a href={`/user/${hero}`}>
                      <img src={`${BASE_URL_ASSET_SQUARE}/${hero}.png`} />
                      <span>{hero}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <a className="linkBottom" href={`/user`}>Todos os campeões</a>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export default Home