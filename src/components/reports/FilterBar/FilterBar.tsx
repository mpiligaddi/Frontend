import { FC, useMemo } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  GridSize
} from '@material-ui/core';
import { GridItem, GridContainer } from '@/components/ui';
import { useFilters, useFilteredData } from '@/api/reports/filters';
import type { ChangeEvent } from '@/typings';

import { useStyles } from './styles';
import { useSelectStyles } from '@/styles/select';

type FilterBarProps = {
  client?: boolean;
  chain?: boolean;
  branch?: boolean;
  category?: boolean;
  reported?: boolean;
  revised?: boolean;
  allChains?: boolean;
  withSpace?: boolean;
  size?: {
    xs: GridSize;
    sm: GridSize;
    md: GridSize;
  };
};

const FilterBar: FC<FilterBarProps> = ({
  client = false,
  chain = true,
  branch = true,
  category = true,
  withSpace = false,
  reported = false,
  revised = false,
  allChains = false,
  size
}) => {
  const classes = useStyles();
  const selectClasses = useSelectStyles();
  const { setFilters, filters } = useFilters();
  const { chains, categories, branches, clients } = useFilteredData({
    reported,
    revised
  });

  const handleSelectClient = (event: ChangeEvent) => {
    setFilters(filters => ({
      ...filters,
      chain: undefined,
      branch: undefined
    }));
    const client = clients.data?.find(
      client => client.ID === event.target.value
    );
    setFilters(filters => ({
      ...filters,
      client
    }));
  };

  const handleSelectChain = (event: ChangeEvent) => {
    setFilters(filters => ({
      ...filters,
      branch: undefined
    }));
    const chain = chains.data?.find(chain => chain.ID === event.target.value);
    setFilters(filters => ({
      ...filters,
      chain
    }));
  };

  const handleSelectBranch = (event: ChangeEvent) => {
    const branch = branches.data?.find(b => b.ID === event.target.value);

    setFilters(filters => ({
      ...filters,
      branch
    }));
  };

  const handleSelectCategory = (event: ChangeEvent) => {
    const category = categories.data?.find(
      category => category.ID === event.target.value
    );
    setFilters(filters => ({
      ...filters,
      category
    }));
  };

  return (
    <div className={classes.root}>
      {withSpace && <br />}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <GridContainer>
            {client && (
              <GridItem {...size}>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                >
                  <InputLabel
                    shrink
                    htmlFor="select-client"
                    className={selectClasses.selectLabel}
                  >
                    Cliente
                  </InputLabel>
                  <Select
                    displayEmpty
                    MenuProps={{
                      className: selectClasses.selectMenu
                    }}
                    classes={{
                      select: selectClasses.select
                    }}
                    value={filters?.client?.ID || ''}
                    onChange={handleSelectClient}
                    inputProps={{
                      name: 'selectClient',
                      id: 'select-client'
                    }}
                  >
                    <MenuItem value={''} disabled>
                      Seleccione Cliente
                    </MenuItem>

                    {clients.data?.map(client => (
                      <MenuItem
                        key={client.ID}
                        classes={{
                          root: selectClasses.selectMenuItem,
                          selected: selectClasses.selectMenuItemSelected
                        }}
                        value={client.ID}
                      >
                        {client.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            )}
            {chain && (
              <GridItem {...size}>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                >
                  <InputLabel
                    shrink
                    htmlFor="select-chain"
                    className={selectClasses.selectLabel}
                  >
                    Cadena
                  </InputLabel>
                  <Select
                    displayEmpty
                    MenuProps={{
                      className: selectClasses.selectMenu
                    }}
                    classes={{
                      select: selectClasses.select
                    }}
                    value={filters?.chain?.ID || ''}
                    onChange={handleSelectChain}
                    inputProps={{
                      name: 'selectChain',
                      id: 'select-chain'
                    }}
                  >
                    <MenuItem value={''} disabled>
                      Seleccione cadena
                    </MenuItem>
                    {allChains && (
                      <MenuItem
                        classes={{
                          root: selectClasses.selectMenuItem,
                          selected: selectClasses.selectMenuItemSelected
                        }}
                        value={''}
                      >
                        Todas
                      </MenuItem>
                    )}

                    {chains.data?.map(chain => (
                      <MenuItem
                        key={chain.ID}
                        classes={{
                          root: selectClasses.selectMenuItem,
                          selected: selectClasses.selectMenuItemSelected
                        }}
                        value={chain.ID}
                      >
                        {chain.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            )}
            {branch && (
              <GridItem {...size}>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                >
                  <InputLabel
                    shrink
                    htmlFor="select-branch"
                    className={selectClasses.selectLabel}
                  >
                    Sucursal
                  </InputLabel>
                  <Select
                    disabled={filters?.chain?.name ? false : true}
                    displayEmpty
                    MenuProps={{
                      className: selectClasses.selectMenu
                    }}
                    classes={{
                      select: selectClasses.select
                    }}
                    value={filters?.branch?.ID || ''}
                    onChange={handleSelectBranch}
                    inputProps={{
                      name: 'selectBranch',
                      id: 'select-branch'
                    }}
                  >
                    <MenuItem value={''} disabled>
                      Seleccione sucursal
                    </MenuItem>
                    {branches.data?.map(branch => (
                      <MenuItem
                        key={branch.ID}
                        classes={{
                          root: selectClasses.selectMenuItem,
                          selected: selectClasses.selectMenuItemSelected
                        }}
                        value={branch.ID}
                      >
                        {branch.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            )}
            {category && (
              <GridItem {...size}>
                <FormControl
                  fullWidth
                  className={selectClasses.selectFormControl}
                >
                  <InputLabel
                    shrink
                    htmlFor="select-category"
                    className={selectClasses.selectLabel}
                  >
                    Categoría
                  </InputLabel>
                  <Select
                    displayEmpty
                    MenuProps={{
                      className: selectClasses.selectMenu
                    }}
                    classes={{
                      select: selectClasses.select
                    }}
                    value={filters?.category?.ID || ''}
                    onChange={handleSelectCategory}
                    inputProps={{
                      name: 'selectCategory',
                      id: 'select-category'
                    }}
                  >
                    <MenuItem
                      classes={{
                        root: selectClasses.selectMenuItem,
                        selected: selectClasses.selectMenuItemSelected
                      }}
                      value={''}
                    >
                      Todas las categorías
                    </MenuItem>
                    {categories.data?.map(category => (
                      <MenuItem
                        key={category.ID}
                        classes={{
                          root: selectClasses.selectMenuItem,
                          selected: selectClasses.selectMenuItemSelected
                        }}
                        value={category.ID}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>
            )}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default FilterBar;
