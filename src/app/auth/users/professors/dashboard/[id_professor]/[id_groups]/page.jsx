 import db from "@/libs/db";
 import StudentCard from "@/components/StudentCard";



async function PageGroup({ params }) {

    const students = await db.users.findMany({
            where:{
                id_group: params.id_groups,
                isprofessor: false
            },
        });

console.log('soy students')
console.log(students)
  return (
    <section className="container mx-auto min-h-screen">
      <div className="grid max-md:grid-flow-row max-md:m-5 md:grid-cols-2 gap-3 mt-10">
        {students.map((student) => (
          <StudentCard student={student} key={student.id_group} params={params}/>
        ))}

      </div>
    </section>
  )
}

export default PageGroup