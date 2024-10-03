import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PlaceIcon from "@mui/icons-material/Place";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddIcon from '@mui/icons-material/Add';
import '../../index.css'
import { Modal } from "@mui/material";
import { deletemeeting } from "../../api/meeting";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function DataTable({data}) {
  const [open1, setOpen1] = React.useState(false);
  const nav = useNavigate()
  const dispatch = useDispatch()

  const handleClose = () => setOpen1(false);

  const handelDelete = (id) => {
    dispatch(deletemeeting(id));
    setOpen1(false);
  };


  return (
    <div>
      {
        data?.map((item,i)=>{
          return(
            <div class="flex border items-center justify-center w-full">
            <div class="text-center w-full">
              <div class=" py-10 md:mb-4 lg:py-10 w-full lg:h-auto bg-white">
                <div class="relative  px-4 md:px-4 mx-auto">
                  <div class="w-full px-4 mb-3 xl:mb-0">
                    <div class="max-w-md md:max-w-lg mx-auto  text-left">
                      
                      <h1 class="font-bold text-4xl md:text-5xl text-indigo-900 mb-6">
                      {item?.title}
                      </h1>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <CalendarTodayIcon />
                                    </b>
                                    <span className="ml-6 font-bold text-gray-600">
                                      {item?.date}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <AccessTimeIcon />
                                    </b>
                                    <span className="ml-5 font-bold text-gray-600">
                                      {item?.time}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      < LocalMallIcon/>
                                    </b>
                                    <span className="ml-5 font-bold text-gray-600">
                                    {item?.department?.department_name}
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100 ">
                        <div class="w-full ">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2 ">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <PersonOutlineIcon />
                                    </b>
                                    {
                                      item?.attendees?.map((attendee,i)=>{
                                        return(
                                          <span key={i} className="ml-5 font-bold text-gray-600 bg-gray-300 p-1 rounded-lg" >
                                      {attendee?.emp_name}
                                    </span>
                                        )
                                      })
                                    }
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="w-full border-b border-coolGray-100">
                        <div class="w-full">
                          <div class="flex flex-wrap items-center justify-between py-4 -m-2">
                            <div class="w-auto p-2">
                              <div class="flex flex-wrap items-center -m-2">
                                <div class="w-auto p-2">
                                  <h2 class="text-lg font-medium text-gray-900">
                                    <b>
                                      <PlaceIcon />
                                    </b>
                                    <span className="ml-6 font-bold text-gray-600">
                                      {item?.location}
                                    </span>
                                  </h2>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="text-sm mb-2 font-semibold text-indigo-900 mt-2 ">
                        <button className="bg-gray-200 py-1 px-2   rounded-xl cursor-pointer" onClick={()=>nav(`/addMom/${item?._id}`)} > <AddIcon/>Add MOM</button>
                        <span className="float-right cursor-pointer" onClick={() => setOpen1(true)}><DeleteIcon/></span>
                        <span className="float-right mr-10 cursor-pointer" onClick={()=>nav(`/editMeeting/${item?._id}`)}><EditIcon/></span>
        
        
                      </div>
                      <div class="relative flex flex-wrap items-center justify-between">
                        <div class="w-1/2 sm:w-1/2">
                          {/* <p class=" mt-4 mb-5 sm:mt-5 sm:mb-10 sm:text-2xl text-md  text-indigo-900 font-bold">
                            Design your Future with new features.
                          </p> */}
                        </div>
                        {/* <button class="block sm:mt-4 sm:px-10 sm:py-2 px-5 py-2  font-semibold sm:text-xl text-sm  text-white bg-green-600 rounded-lg sm:rounded-md">
                          Yes
                        </button>
                        <button class="block sm:mt-4 sm:px-10 sm:py-2 px-5 py-2  font-semibold sm:text-xl text-sm  text-white bg-red-600 rounded-lg sm:rounded-md">
                          No
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
                <>
                <Modal
                        open={open1}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <section class="z-40 fixed top-0 left-0 flex items-center justify-center w-full h-full bg-white bg-opacity-10">
                          <div class="p-4">
                            <div class="relative p-6 py-11 bg-blueGray-900 bg-opacity-30 max-w-lg text-center w-full rounded-5xl">
                              <p class="mb-8 text-white text-2xl">
                                Do you want to delete this user?
                              </p>
                              <div class="flex flex-wrap justify-center -m-2">
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 text-white font-semibold text-lg tracking-2xl hover:bg-gray-600 hover:text-white border rounded-full transition duration-300 cursor-pointer"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </a>
                                </div>
                                <div class="w-auto p-2">
                                  <a
                                    class="inline-block px-14 py-4 font-semibold text-lg border bg-gray-100 hover:bg-red-800 text-indigo-800 hover:text-white rounded-full transition duration-300 cursor-pointer"
                                    onClick={() => handelDelete(item?._id)}
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </Modal>
                </>
              </div>
            </div>
          </div>
          )
        })
      }
  </div>
  )
}

export default DataTable