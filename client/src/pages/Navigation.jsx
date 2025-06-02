import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      WEB3 TODO
      <ul>
        <li>
          <Link to="/">Wallet</Link>
        </li>
        <li>
          <Link to="/view-task">View Task</Link>
        </li>
        <li>
          <Link to="/view-all">View All Tasks</Link>
        </li>
        <li>
          <Link to="/create-task">Create Task</Link>
        </li>
        <li>
          <Link to="/update-task">Update Task</Link>
        </li>
        <li>
          <Link to="/delete-task">Delete Task</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
