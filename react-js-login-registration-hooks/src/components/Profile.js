import { React, useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import swal from "sweetalert";
import UserService from "../services/user.service";
import NavBar from "./Nav";

const Profile = (props) => {
  //Get ID from url
  const { id } = useParams();

  // UseNavigate to move other components
  const navigate = useNavigate();

  // set states for user
  const [User, setUser] = useState([]);
  const [createUser, setcreateUser] = useState([]);

  const UserRef = useRef();
  UserRef.current = User;

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  //Show Logged in User with Url id
  const getCurrentUser = async () => {
    UserService.getCurrentUser(id)
      .then((response) => {
        const newState = [
          ...User,
          {
            id: response.data.data.id,
            userName: response.data.data.userName,
            email: response.data.data.email,
          },
        ];
        setUser(newState);
      })
      .catch((error) => {
        console.log("Err", error);
      });

    //for New created user to navigate this profile page
    UserService.getAllUser(id)
      .then((response) => {
        const State = [
          ...createUser,
          {
            id: response.data.data.id,
            userName: response.data.data.userName,
            email: response.data.data.email,
          },
        ];
        setcreateUser(State);
      })
      .catch((error) => {
        console.log("Err", error);
      });
  };

  //Function to go to Update page with user id
  const updateUser = async () => {
    navigate("/update/" + id);
  };

  //Delete Login user with profile
  const deleteUser = async () => {
    //Use Sweet Alert popup modal for Delete confirmation
    swal({
      title: "Are you sure?",
      text: "Once deleted, This action cannot be undone!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        UserService.remove(id).then((response) => {
          swal("User Deleted successfully!", {
            icon: "success",
          });
          navigate("/register");
        });
      } else {
        // swal("Your data is safe!");
      }
    });
  };

  //Setting up column header
  const columns = useMemo(
    () => [
      {
        Header: "UserId",
        accessor: "id",
      },
      {
        Header: "UserName",
        accessor: "userName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => {
          const rowIdx = id;
          return (
            <div>
              <button
                type="button"
                className="mr-2 px-3 py-2.5 bg-blue-400 text-white font-medium text-xs uppercase rounded-full hover:bg-blue-500 hover:shadow-lg active:bg-blue-600 active:shadow-lg"
                onClick={() => updateUser(rowIdx)}
              >
                Edit
              </button>
              <button
                type="button"
                className="px-3 py-2.5 bg-red-600 text-white font-medium text-xs uppercase rounded-full hover:bg-red-700 hover:shadow-lg active:bg-red-700 active:shadow-lg"
                onClick={() => deleteUser(rowIdx)}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: User,
    });

  return (
    <>
      <header className="sticky top-0 h-fit z-20 bg-gray-100 dark:bg-gray-900">
        <NavBar />
      </header>
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <div className="my-4 ml-4 text-medium font-bold text-slate-800 uppercase ">
                User Profile
              </div>
              <table
                className="min-w-full divide-y divide-gray-300"
                // apply the table props
                {...getTableProps()}
              >
                <thead className="bg-gray-50">
                  {
                    // Loop over the header rows
                    headerGroups.map((headerGroup) => (
                      // Apply the header row props
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                          //Loop over the headers in each row
                          headerGroup.headers.map((column) => (
                            // Apply the header cell props
                            <th
                              className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase "
                              {...column.getHeaderProps()}
                            >
                              {
                                // Render the header
                                column.render("Header")
                              }
                            </th>
                          ))
                        }
                      </tr>
                    ))
                  }
                </thead>
                {/* Apply the table body props  */}
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {
                    // Loop over the table rows
                    rows.map((row, i) => {
                      prepareRow(row);
                      return (
                        // Apply the row props
                        <tr
                          {...row.getRowProps()}
                          className="divide-x divide-gray-100"
                        >
                          {row.cells.map((cell) => {
                            // Apply the cell props
                            return (
                              <td
                                {...cell.getCellProps()}
                                className="px-6 py-4 whitespace-nowrap"
                              >
                                {
                                  //Render the cell contents
                                  cell.render("Cell")
                                }
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
