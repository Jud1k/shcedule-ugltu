import { FiSearch } from 'react-icons/fi';
import { SlNote, SlTrash } from 'react-icons/sl';
import { FaPlusCircle } from 'react-icons/fa';

function Update() {
  return <SlNote />;
}

function Delete() {
  return <SlTrash />;
}

function Create() {
  return <FaPlusCircle />;
}

function Search() {
  return <FiSearch />;
}

export { Update, Delete, Create, Search };
