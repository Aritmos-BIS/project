'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Loadview from '@/components/Loadview';
import Checker from '@/components/Checker';


function ConfigurationPage({ params }) {
  const router = useRouter()
  const { data: session } = useSession();
  const [fullname, setFullname] = useState("");
  const [school, setSchool] = useState("");
  const [id_group, setGroupId] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [groupName, setGroupName] = useState(""); 

  useEffect(() => {

    if (params.id_professor) {
      setLoading(true);

      fetch(`/api/professors/${Number(params.id_professor)}`)
        .then((res) => res.json())
        .then((data) => {
          setFullname(data.fullname);
          setSchool(data.school);
          setGroupId(data.id_group)
          return fetch(`/api/groups-unique/${Number(data.id_group)}`);
        })
        .then((res) => res.json())
        .then((data) => {
          setGroupName(data.group_name);

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle errors appropriately
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [params.id_professor]);

  const onSubmit = async (e) => {
    e.preventDefault();
  
    if (params.id_professor) {
      const professorData = {
        fullname,
        school,
        id_group,
      };
  
      try {
        const res = await fetch(`/api/professors/${params.id_professor}`, {
          method: "PUT",
          body: JSON.stringify(professorData),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!res.ok) {
          console.error('Failed to update professor details:', res.statusText);
          // Handle the error (e.g., show an error message to the user)
          return;
        }
  
        const data = await res.json();
        // Handle the data if needed
      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  
    if (id_group) {
      const groupData = {
        group_name: groupName,
      };
  
      try {
        const res = await fetch(`/api/groups-unique/${id_group}`, {
          method: "PUT",
          body: JSON.stringify(groupData),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!res.ok) {
          console.error('Failed to update group details:', res.statusText);
          // Handle the error (e.g., show an error message to the user)
          return;
        }
  
        const data = await res.json();
        // Handle the data if needed
      } catch (error) {
        console.error('Error parsing JSON or making the request:', error);
        // Handle the error (e.g., show an error message to the user)
      }
    }
  
    router.push(`/auth/users/professors/dashboard/${params.id_professor}`);
  };
  

  return (
    <Checker id={params.id_professor}>
      <div className=' h-screen flex justify-center items-center'>
          {loading ? (
          <Loadview/>
        ) : (
          <>
              <form action="" className='bg-purple-600 shadow-black shadow-xl m-10 text-white rounded-xl p-10 lg:w-1/4 md:w-full' onSubmit={onSubmit}>
                  <h1 className='text-center text-3xl font-bold mb-5'>Edicion de perfil</h1>
                <label htmlFor="title" className='font-semibold text-sm'>Nombre</label>
                <input 
                  type='text' 
                  placeholder='Nombre' 
                  className=' border border-purple-800 border-solid shadow-inner shadow-black rounded-xl p-2 mb-4 w-full text-black' 
                  id='fullname'
                  onChange={(e) => setFullname(e.target.value)}
                  value={fullname}
                  />


                  <label htmlFor="title" className='font-semibold text-sm'>Grupo</label>
                  <input 
                    type='text' 
                    placeholder='Grupo' 
                    className=' border border-purple-800 border-solid shadow-inner shadow-black rounded-xl p-2 mb-4 w-full text-black' 
                    id='groupName'
                    onChange={(e) => setGroupName  (e.target.value)}
                    value={groupName}
                  />

                  <label htmlFor="title" className='font-semibold text-sm'>Escuela</label>
                  <input 
                    type='text' 
                    placeholder='Escuela' 
                    className=' border border-purple-800 border-solid shadow-inner shadow-black rounded-xl p-2 mb-4 w-full text-black' 
                    id='lastname'
                    onChange={(e) => setSchool (e.target.value)}
                    value={school}
                  />

                  <div className='grid grid-flow-col justify-between'>
                  <Link href={`/auth/users/professors/dashboard/${session?.user.id}`}><button className="mx-auto bg-rose-500 text-lg font-medium text-center rounded-lg shadow-lg items-center justify-center w-full p-1 hover:shadow-inner hover:shadow-black hover:bg-sore-700 hover:text-gray-900 text-white transition-all duration-500" >Cancelar</button></Link>
                    <button className='mx-auto bg-sky-500 text-lg font-medium text-center rounded-lg shadow-lg items-center justify-center w-full p-1 hover:shadow-inner hover:shadow-black hover:bg-sky-700 hover:text-gray-900 text-white transition-all duration-500' type='submit'>
                      Actualizar perfil
                    </button>
                  </div>
                </form>
              
              </>
          )}
        </div>

    </Checker>
  )
}

export default ConfigurationPage