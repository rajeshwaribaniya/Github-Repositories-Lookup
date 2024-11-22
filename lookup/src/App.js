import React, { useState } from 'react'

function App() {

  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchRepo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );

      if (!response.ok) {
        throw new Error("User not found or network error");
      }

      const data = await response.json();
      setRepos(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className='flex flex-col justify-center items-center p-[24px]'>


      {/* main div */}
      <div className=' flex flex-col gap-[16px] shadow-md rounded-[12px] p-[16px] w-[464px] '>

        <div>
          <p className='text-text-primary text-[32px] font-[600]'>Github Repositories Lookup</p>
        </div>

        {/* form part */}

        <div className='flex w-full'>

          <form className='flex gap-[4px] w-full'
            onSubmit={(e) => {
              e.preventDefault();
              handleFetchRepo();
            }}>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Enter Github Username'
              className='flex flex-grow  py-[8px] px-[16px] border border-border-primary rounded-[6px] '>

            </input>

            <button
              type='submit'
              className='bg-brand-color text-text-white px-[16px] py-[8px] rounded-[6px]'>
              Search
            </button>

          </form>



        </div>

        {loading && <p className="text-[24px] text-text-secondary">Loading...</p>}
        {error && <p className="text-[#ED1B24]">Error: {error}</p>}


        {/* repos display part */}

        {repos && !loading && !error && (

          <div className='flex flex-col gap-[16px]'>
            {repos.map((repo) => {
              return (
                <div className='flex flex-col  py-[16px] gap-[8px] border-y border-border-primary '>

                  <div className='flex gap-[8px] items-center'>

                    <p className='text-[24px] font-[500]'>{repo.name}</p>

                    <div>

                      {repo.private ?

                        <div className='border border-border-primary rounded-full px-[8px] py-[2px] text-text-secondary text-[12px]'> Private </div> :

                        <div className='border border-border-primary rounded-full px-[8px] py-[2px] text-text-secondary text-[12px]'>Public </div>}



                    </div>







                  </div>

                  <p className='text-[16px] text-text-secondary'>{repo.description || "No description available"}</p>

                  {/* show updated on + fork count + language + star*/}


                  <div className='flex gap-[16px]'>

                    {/* language */}

                    {(repo.language !== null) &&

                      <div className='flex gap-[6px] items-center'>
                        <img src="/assets/icons/language.png" alt='language' className='w-[14px]' />
                        <p className='text-[14px] text-text-secondary'>{repo.language}</p>
                      </div>

                    }

                    {/* star count */}

                    {repo.stargazers_count > 0 &&
                      <div className='flex gap-[4px] items-center'>
                        <img src="/assets/icons/star.png" alt='staricon' className='w-[18px]' />
                        <p className='text-[14px] text-text-secondary'>{repo.stargazers_count}</p>
                      </div>
                    }


                    {/* show fork count with fork icon */}
                    {repo.forks_count > 0 &&
                      <div className='flex gap-[4px] items-center'>
                        <img src="/assets/icons/fork.png" alt='forkicon' className='w-[14px]' />
                        <p className='text-[14px] text-text-secondary'>{repo.forks_count}</p>
                      </div>
                    }

                    <p
                      className='text-[14px] text-text-secondary'>
                      Updated on: {new Date(repo.updated_at).toLocaleDateString('en-US', { dateStyle: 'long' })}
                    </p>



                  </div>



                </div>



              );
            })}

          </div>
        )}

      </div>

    </div>







  );
}

export default App;
