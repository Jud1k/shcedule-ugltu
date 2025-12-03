import { SearchInput } from '@/components/generic/Input';
import { Panel, PanelBody, PanelHeader } from '@/components/generic/Panel';
import Select from '@/components/generic/Select';
import { useState } from 'react';
import { useGroupsSummary } from '../api/get-groups-summary';
import { COURSES, INSTITUTIES } from '../types/consts';
import { UpdateGroup } from './UpdateGroup';
import { DeleteGroup } from './DeleteGroup';

export const GroupsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedInstitute, setSelectedInstitute] = useState<string>('all');

  const groupsQuery = useGroupsSummary({});
  const groups = groupsQuery.data;

  const filtredGroups = groups?.filter((group) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = group.name.toLowerCase().trim().includes(query);
    const matchesCourses =
      selectedCourse === 'all' || group.course === Number(selectedCourse);
    const matchesInstitutes =
      selectedInstitute === 'all' || group.institute === selectedInstitute;
    return matchesSearch && matchesCourses && matchesInstitutes;
  });

  return (
    <>
      <Panel className="mb-8">
        <PanelHeader>Поиск</PanelHeader>
        <PanelBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 sm:flex-[2] min-w-0">
              <SearchInput
                value={searchQuery}
                placeholder="Введите название группы..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-1 min-w-0">
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value={'all'}>Все курсы</option>
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex-1 min-w-0">
              <Select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                <option value={'all'}>Все институты</option>
                {INSTITUTIES.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </PanelBody>
      </Panel>
      <Panel>
        <PanelHeader>
          <h3>Группы ({groups?.length || 0})</h3>
        </PanelHeader>
        <PanelBody>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Курс</th>
                  <th>Институт</th>
                  <th>Кол-во студентов</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtredGroups?.map((group) => (
                  <tr key={group.id}>
                    <th>{group.name}</th>
                    <td>{group.course}</td>
                    <td>{group.institute}</td>
                    <td>{group.count_students}</td>
                    <td>
                      <UpdateGroup groupId={group.id} />
                      <DeleteGroup groupId={group.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelBody>
      </Panel>
    </>
  );
};
