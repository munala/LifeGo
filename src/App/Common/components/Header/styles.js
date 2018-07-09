export const styles = theme => ({
  searchInput: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#676767',
    fontSize: 20,
    backgroundColor: '#E5E5E5',
    height: 48,
    borderRadius: 4,
    paddingLeft: 12,
  },
  margin: {
    margin: theme.spacing.unit,
    cursor: 'pointer',
  },
});

export const otherStyles = {
  avatar: {
    height: 48,
    width: 48,
    cursor: 'pointer',
  },
  signIn: {
    marginRight: 24,
  },
  chatModal: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};
