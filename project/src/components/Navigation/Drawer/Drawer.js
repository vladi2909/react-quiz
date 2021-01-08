import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../ui/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
    { to: '/', label: 'List', exact: true },
    { to: '/auth', label: 'Authorization', exact: false },
    { to: '/quiz-creator', label: 'Create test', exact: false }
];



class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose();
    }

    renderlinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}>
                        {link.label}
                    </NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderlinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}

            </>
        );
    }
}

export default Drawer;