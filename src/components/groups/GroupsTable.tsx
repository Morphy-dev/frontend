import {
    ArrowDownIcon,
    ArrowUpIcon,
    GroupIcon,
  } from "../../icons";
  import Badge from "../ui/badge/Badge";
  import { useNavigate, Link } from "react-router-dom";
  
  /** Example group data */
  interface GroupData {
    id: number;
    name: string;
    studentCount: number;
    lastSession: string;
    progress: number; // percentage
  }
  
  const groups: GroupData[] = [
    {
      id: 1,
      name: "Grupo 1",
      studentCount: 10,
      lastSession: "March 7",
      progress: 15,
    },
    {
      id: 2,
      name: "Grupo 2",
      studentCount: 10,
      lastSession: "March 7",
      progress: 0,
    },
    {
      id: 3,
      name: "Grupo 3",
      studentCount: 8,
      lastSession: "March 1",
      progress: 50,
    },
    // Add as many groups as you like
  ];
  
  export default function GroupsTable() {
    const navigate = useNavigate();
  
    const handlePrepareLesson = (groupId: number) => {
      // e.g., navigate to "prepare lesson" page
      console.log(`Preparing lesson for group #${groupId}`);
      // navigate(`/groups/${groupId}/prepare`);
    };
  
    const handleStartLesson = (groupId: number) => {
      // e.g., navigate to "start lesson" page
      console.log(`Starting lesson for group #${groupId}`);
      // navigate(`/groups/${groupId}/start`);
    };
  
    return (
      <section className="mt-6">
        {/* Heading row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Groups
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              You have {groups.length} groups
            </p>
          </div>
          <button
            onClick={() => {/* navigate to all groups page */}}
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 text-sm font-medium"
          >
            See all groups
          </button>
        </div>
  
        {/* Groups + Create Group */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {/* Create Group Card */}
          <Link className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-5 text-center dark:border-gray-700 dark:bg-white/5"  to='/create_group'>
          <button
            onClick={() => {/* navigate to create group page */}}
            
          >
            <div className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
              +
            </div>
            <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Crear grupo
            </p>
          </button>
          </Link>
          {/* Render each group card */}
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]"
            >
              {/* Icon / Title Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                    <GroupIcon className="size-5 text-gray-800 dark:text-white/90" />
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-gray-800 dark:text-white/90">
                      {group.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {group.studentCount} students
                    </p>
                  </div>
                </div>
                {/* Example progress ring replaced with a badge here */}
                <Badge color={group.progress === 0 ? "error" : "success"}>
                  {group.progress === 0 ? (
                    <ArrowDownIcon className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowUpIcon className="mr-1 h-4 w-4" />
                  )}
                  {group.progress}%
                </Badge>
              </div>
  
              {/* Last Session Info */}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Last session: {group.lastSession}
              </p>
  
              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-5">
                <button
                  onClick={() => handlePrepareLesson(group.id)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.06]"
                >
                  Prepare lesson
                </button>
                <button
                  onClick={() => handleStartLesson(group.id)}
                  className="rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500"
                >
                  Start lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  