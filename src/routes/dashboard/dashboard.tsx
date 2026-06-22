import { Header } from './header.tsx';
import { Button } from '../../components/primitives/Button';
import { IconButton } from '../../components/primitives/Button';
import { DeleteIcon, EditIcon } from '../../assets/svg';
import { dummyTodos } from './dummyData.tsx';

export function Dashboard() {
  return (
    <div>
      <Header />
      <div className="py-20 px-37.5">
        {/*Dashboard Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-extrabold leading-7 text-green-800 ">
            Welcome to your to-do list!
          </h2>
          <Button type="button" variant="solid" size="small">
            CREATE NEW TASK
          </Button>
        </div>
        <div className="flex flex-col gap-8 mt-10">
          {dummyTodos.map((todo, index) => (
            <div
              key={index}
              className="py-2.5 px-8 bg-white shadow-soft rounded-lg flex justify-between items-center"
            >
              {/* Table Left Content */}
              <div className="flex items-center gap-5">
                <h4 className="text-base font-normal font-fira leading-4 text-gray-600">
                  {todo.title}
                </h4>

                <div className="flex gap-2">
                  {todo.labelsArray &&
                    todo.labelsArray.map((label, i) => (
                      <div
                        key={i}
                        className="bg-gray-450 text-white rounded-sm text-xs font-normal leading-3.5 font-fira px-2 py-0.5"
                      >
                        {label}
                      </div>
                    ))}
                </div>
              </div>

              {/* Table Right Content */}
              <div className="flex items-center gap-3">
                <h5 className="text-sm font-normal leading-7 font-fira text-gray-600">
                  {todo.priority}
                </h5>

                <div className="flex gap-1">
                  <IconButton>
                    <EditIcon />
                  </IconButton>

                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
