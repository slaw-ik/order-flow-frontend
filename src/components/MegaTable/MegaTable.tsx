import React, { CSSProperties } from 'react';
import Pagination from './Pagination';
import FooterInfo from './FooterInfo';
import Content from './Content';

import './styles.scss';
import Header from './Header';
import { MegaLink } from '../MegaLink/MegaLink';

interface MegaTableProps {
  resourceName?: string;
  resource: string;
  records: BaseRecord[];
  total: number;
  page: number;
  onPageChanges: (page: number) => void;
  status: string;
  dataStructure: DataStructure[];
  customRow?: (record: any) => JSX.Element;
  showActions?: ShowActions;
}

export interface ShowActions {
  actions: ('show' | 'edit' | 'delete')[];
}

export interface DataStructure {
  key: string;
  name: string;
  style?: CSSProperties;
}

export interface BaseRecord {
  [key: string]: any;
}

const MegaTable = ({
  resourceName = 'Records',
  resource,
  records,
  page,
  total,
  onPageChanges,
  status,
  dataStructure,
  customRow,
  showActions,
}: MegaTableProps) => {
  return (
    <>
      <div className="row align-items-center">
        <div className="col-md-6">
          <div className="mb-3">
            <h5 className="card-title">
              {resourceName} <span className="text-muted fw-normal ms-2">({total})</span>
            </h5>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
            <div>
              <MegaLink href={`/${resource}/new`} className="btn btn-primary">
                <i className="bi bi-plus-lg"></i> Add New
              </MegaLink>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="table-responsive mega-table">
            <table className="table project-list-table table-nowrap align-middle table-borderless">
              <thead>
                <Header dataStructure={dataStructure} showActions={showActions} />
              </thead>
              <tbody>
                <Content
                  resource={resource}
                  records={records}
                  dataStructure={dataStructure}
                  status={status}
                  customRow={customRow}
                  showActions={showActions}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row g-0 align-items-center pb-4">
        <div className="col-sm-6">
          <FooterInfo page={page} total={total} count={records.length} />
        </div>
        <div className="col-sm-6">
          <div className="float-sm-end">
            <Pagination page={page} total={total} onPageChanges={onPageChanges} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaTable;
