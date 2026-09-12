import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Plus,
  Search,
  Trash2,
  Pencil,
  X,
  Save,
  CalendarDays,
  User,
  CheckCircle,
} from "lucide-react";

import { supabase } from "./supabase";


const COLORS = {
  navy: "#131C42",
  teal: "#008B8B",
  aqua: "#20B2AA",
  green: "#5DBE4E",
  gray: "#7A879B",
  light: "#F4F8F8",
  white: "#FFFFFF",
  border: "#E2EAEE",
};


const PROJECT_TYPES = [
  "Permit Review",
  "Plan Review",
  "Inspection",
  "Permit Expediting",
  "Construction Management",
];


const STATUS = [
  "Planning",
  "Submitted",
  "Under Review",
  "Approved",
  "In Progress",
  "Completed",
  "On Hold",
];


function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}



async function loadProjects() {

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", {
      ascending:false
    });


  if(error){
    console.error(
      "Load error:",
      error
    );

    return [];
  }


  return data || [];
}



async function saveProject(project){

  const { error } = await supabase
    .from("projects")
    .upsert(
      project,
      {
        onConflict:"id"
      }
    );


  if(error){
    console.error(
      "Save error:",
      error
    );
  }

}



async function deleteProject(id){

  const {error}=await supabase
    .from("projects")
    .delete()
    .eq(
      "id",
      id
    );


  if(error){
    console.error(
      "Delete error:",
      error
    );
  }

}



export default function GRIPCRM(){

  const [projects,setProjects]=useState([]);

  const [loading,setLoading]=useState(true);

  const [search,setSearch]=useState("");

  const [showModal,setShowModal]=useState(false);

  const [editing,setEditing]=useState(null);



  useEffect(()=>{

    async function init(){

      const data=await loadProjects();

      setProjects(data);

      setLoading(false);

    }

    init();

  },[]);



  const stats=useMemo(()=>{

    return {

      total:projects.length,

      completed:
        projects.filter(
          p=>p.status==="Completed"
        ).length,

      active:
        projects.filter(
          p=>p.status!=="Completed"
        ).length

    };

  },[projects]);



  const filtered=projects.filter(p=>{

    const q=search.toLowerCase();

    return (

      p.project_name
      ?.toLowerCase()
      .includes(q)

      ||

      p.client_name
      ?.toLowerCase()
      .includes(q)

    );

  });



  function openNew(){

    setEditing({

      project_name:"",

      client_name:"",

      project_type:"Permit Review",

      status:"Planning",

      progress:0,

      due_date:"",

      assigned_to:"",

      notes:""

    });


    setShowModal(true);

  }
    function openEdit(project){

    setEditing({
      ...project
    });

    setShowModal(true);

  }



  async function handleSave(){

    if(
      !editing.project_name ||
      !editing.client_name
    ){

      alert(
        "Project name and client name are required."
      );

      return;

    }


    const record={

      ...editing,

      progress:
        Number(editing.progress)||0

    };


    await saveProject(record);


    const refreshed=
      await loadProjects();


    setProjects(refreshed);


    setShowModal(false);

    setEditing(null);

  }



  async function handleDelete(id){

    if(
      !confirm(
        "Delete this project?"
      )
    ){
      return;
    }


    await deleteProject(id);


    setProjects(
      projects.filter(
        p=>p.id!==id
      )
    );

  }



  if(loading){

    return (

      <div
        style={{
          padding:40,
          fontFamily:"Arial"
        }}
      >

        Loading GRIP CRM...

      </div>

    );

  }



  return (

    <div
      style={{
        minHeight:"100vh",
        background:COLORS.light,
        fontFamily:"Arial, sans-serif",
        color:COLORS.navy
      }}
    >


      <header
        style={{
          background:"#fff",
          borderBottom:
            `1px solid ${COLORS.border}`,
          padding:"18px 30px"
        }}
      >

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}
        >

          <div>

            <h1
              style={{
                margin:0,
                fontSize:24
              }}
            >

              GRIP CRM

            </h1>


            <p
              style={{
                margin:"5px 0",
                color:COLORS.gray
              }}
            >

              Professional Project Management Dashboard

            </p>

          </div>



          <button

            onClick={openNew}

            style={{
              background:COLORS.teal,
              color:"#fff",
              border:"none",
              padding:"12px 18px",
              borderRadius:8,
              cursor:"pointer",
              display:"flex",
              gap:8,
              alignItems:"center"
            }}

          >

            <Plus size={18}/>

            Add Project

          </button>


        </div>


      </header>




      <main
        style={{
          padding:30,
          maxWidth:1200,
          margin:"auto"
        }}
      >



        <div
          style={{
            display:"grid",
            gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
            gap:20
          }}
        >


          <StatCard

            icon={<FolderKanban/>}

            title="Total Projects"

            value={stats.total}

          />


          <StatCard

            icon={<CheckCircle/>}

            title="Completed"

            value={stats.completed}

          />


          <StatCard

            icon={<LayoutDashboard/>}

            title="Active"

            value={stats.active}

          />


        </div>



        <div
          style={{
            marginTop:30,
            background:"#fff",
            borderRadius:12,
            padding:20,
            border:
            `1px solid ${COLORS.border}`
          }}
        >


          <div
            style={{
              display:"flex",
              gap:10,
              marginBottom:20
            }}
          >

            <Search/>

            <input

              placeholder="Search project or client..."

              value={search}

              onChange={
                e=>setSearch(e.target.value)
              }

              style={{
                flex:1,
                padding:12,
                borderRadius:8,
                border:
                `1px solid ${COLORS.border}`
              }}

            />


          </div>



          <table
            style={{
              width:"100%",
              borderCollapse:"collapse"
            }}
          >

            <thead>

              <tr
                style={{
                  background:COLORS.navy,
                  color:"#fff"
                }}
              >

                <th>Project</th>

                <th>Client</th>

                <th>Status</th>

                <th>Progress</th>

                <th>Due Date</th>

                <th>Action</th>

              </tr>

            </thead>



            <tbody>


              {filtered.map(project=>(


                <tr
                  key={project.id}
                  style={{
                    borderBottom:
                    `1px solid ${COLORS.border}`
                  }}
                >


                  <td>
                    {project.project_name}
                  </td>


                  <td>
                    {project.client_name}
                  </td>


                  <td>
                    {project.status}
                  </td>


                  <td>

                    {project.progress || 0}%

                  </td>


                  <td>

                    {formatDate(
                      project.due_date
                    )}

                  </td>


                  <td>

                    <button

                      onClick={()=>
                        openEdit(project)
                      }

                    >

                      <Pencil size={16}/>

                    </button>


                    <button

                      onClick={()=>
                        handleDelete(project.id)
                      }

                    >

                      <Trash2 size={16}/>

                    </button>


                  </td>


                </tr>


              ))}


            </tbody>


          </table>


        </div>


      </main>
            {showModal && editing && (

        <div
          style={{
            position:"fixed",
            inset:0,
            background:"rgba(0,0,0,.45)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            zIndex:100
          }}
        >


          <div
            style={{
              background:"#fff",
              width:"95%",
              maxWidth:600,
              borderRadius:15,
              padding:25
            }}
          >


            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center"
              }}
            >

              <h2>
                {editing.id
                  ? "Edit Project"
                  : "Add Project"}
              </h2>


              <button
                onClick={()=>{
                  setShowModal(false);
                  setEditing(null);
                }}
                style={{
                  border:"none",
                  background:"none",
                  cursor:"pointer"
                }}
              >

                <X/>

              </button>


            </div>



            <FormField
              label="Project Name"
            >

              <input

                value={editing.project_name || ""}

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    project_name:e.target.value
                  })
                }

              />

            </FormField>




            <FormField
              label="Client Name"
            >

              <input

                value={editing.client_name || ""}

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    client_name:e.target.value
                  })
                }

              />

            </FormField>




            <FormField
              label="Project Type"
            >

              <select

                value={
                  editing.project_type || ""
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    project_type:e.target.value
                  })
                }

              >

                {PROJECT_TYPES.map(type=>(

                  <option
                    key={type}
                  >

                    {type}

                  </option>

                ))}

              </select>

            </FormField>




            <FormField
              label="Status"
            >

              <select

                value={
                  editing.status || ""
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    status:e.target.value
                  })
                }

              >

                {STATUS.map(status=>(

                  <option
                    key={status}
                  >

                    {status}

                  </option>

                ))}

              </select>

            </FormField>




            <FormField
              label="Progress (%)"
            >

              <input

                type="number"

                min="0"

                max="100"

                value={
                  editing.progress || 0
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    progress:e.target.value
                  })
                }

              />

            </FormField>




            <FormField
              label="Due Date"
            >

              <input

                type="date"

                value={
                  editing.due_date || ""
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    due_date:e.target.value
                  })
                }

              />

            </FormField>




            <FormField
              label="Assigned To"
            >

              <input

                value={
                  editing.assigned_to || ""
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    assigned_to:e.target.value
                  })
                }

              />

            </FormField>




            <FormField
              label="Notes"
            >

              <textarea

                rows="4"

                value={
                  editing.notes || ""
                }

                onChange={
                  e=>
                  setEditing({
                    ...editing,
                    notes:e.target.value
                  })
                }

              />

            </FormField>




            <div
              style={{
                display:"flex",
                justifyContent:"flex-end",
                gap:10,
                marginTop:20
              }}
            >


              <button

                onClick={()=>{
                  setShowModal(false);
                  setEditing(null);
                }}

              >

                Cancel

              </button>



              <button

                onClick={handleSave}

                style={{
                  background:COLORS.teal,
                  color:"#fff",
                  border:"none",
                  padding:"10px 18px",
                  borderRadius:8,
                  cursor:"pointer",
                  display:"flex",
                  gap:8,
                  alignItems:"center"
                }}

              >

                <Save size={16}/>

                Save Project

              </button>


            </div>



          </div>


        </div>

      )}


    </div>

  );

}
function StatCard({ icon, title, value }) {

  return (

    <div
      style={{
        background:"#fff",
        border:
          `1px solid ${COLORS.border}`,
        borderRadius:12,
        padding:20,
        display:"flex",
        alignItems:"center",
        gap:15
      }}
    >

      <div
        style={{
          width:45,
          height:45,
          borderRadius:10,
          background:COLORS.teal,
          color:"#fff",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}
      >

        {icon}

      </div>


      <div>

        <div
          style={{
            color:COLORS.gray,
            fontSize:14
          }}
        >

          {title}

        </div>


        <div
          style={{
            fontSize:28,
            fontWeight:700
          }}
        >

          {value}

        </div>

      </div>


    </div>

  );

}

function FormField({
  label,
  children
}) {

  return (

    <div
      style={{
        marginBottom:15
      }}
    >

      <label
        style={{
          display:"block",
          marginBottom:6,
          fontWeight:600,
          color:COLORS.navy
        }}
      >

        {label}

      </label>


      {React.cloneElement(
        children,
        {
          style:{
            width:"100%",
            padding:"10px 12px",
            border:
              `1px solid ${COLORS.border}`,
            borderRadius:8,
            fontSize:14
          }
        }
      )}

    </div>

  );

}
